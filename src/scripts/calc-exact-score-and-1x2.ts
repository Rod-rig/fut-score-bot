// src/scripts/calc-exact-score-and-1x2.ts

import { prisma } from "@l/prisma";
import { isAnyOther, isAnyOtherScore } from "@u/is-any-other";
import { round } from "../utils/round";
import { getResult } from "../utils/get-result";

/**
 * Рахує:
 * - exactScore, exactScorePercentage: точні рахунки
 * - oneXTwo, oneXTwoPercentage: 1X2 результати
 * - profit: фінальний баланс (як у calcBalance з stake=1)
 * - roi: відсоток ROI (profit / totalPredictions * 100)
 */
export async function calculateExactAnd1X2(): Promise<void> {
  const users = await prisma.user.findMany({
    include: {
      predictions: {
        include: {
          event: {
            include: {
              odd: true,
            },
          },
        },
      },
    },
  });

  // Базовий коефіцієнт ставки (для розрахунку calcBalance)
  const STAKE = 100;

  for (const user of users) {
    let exactCount = 0;
    let oneXTwoCount = 0;
    let balance = 0; // емулюємо баланс як у calcBalance

    for (const prediction of user.predictions) {
      const expected = prediction.value;
      const actual = prediction.event?.score;
      if (!actual) continue;

      const expectedIsAnyOther = isAnyOther(expected);

      // exact: точне співпадіння або "Any other" проти великого рахунку (isAnyOtherScore)
      const isExact =
        expected === actual || (expectedIsAnyOther && isAnyOtherScore(actual));
      if (isExact) {
        exactCount += 1;
        oneXTwoCount += 1;
        // calcBalance логіка для exact: якщо exact, то вгадано 1X2
        if (!expectedIsAnyOther) {
          const result = getResult(expected);
          const key = result === "1" ? "one" : result === "2" ? "two" : "x";
          balance = Math.round(
            balance + (prediction.event?.odd?.[key] - 1) * STAKE,
          );
        } else {
          // Для "Any other" точного — баланс не змінюється (як у calcBalance)
          // balance = balance (без змін)
        }
        continue;
      }

      // Якщо прогноз не "Any other", порівнюємо 1X2 результати (calcBalance логіка)
      if (!expectedIsAnyOther) {
        try {
          if (getResult(actual) === getResult(expected)) {
            oneXTwoCount += 1;
            // correctResult 1X2 → додаємо прибуток
            const result = getResult(expected);
            const key = result === "1" ? "one" : result === "2" ? "two" : "x";
            balance = Math.round(
              balance + (prediction.event?.odd?.[key] - 1) * STAKE,
            );
          } else {
            // неправильна 1X2 → втрачаємо ставку
            balance = balance - STAKE;
          }
        } catch (err) {
          // на випадок некоректного формату — утрачаємо ставку
          balance = balance - STAKE;
        }
      } else {
        // expectedIsAnyOther та actual не підпадає під isAnyOtherScore
        // → не зараховується ні для exact, ні для 1X2
        // баланс не змінюється (ставка не втрачається, але й не виграється)
        // (залежно від правил гри, можете змінити на balance -= STAKE)
      }
    }

    const totalPredictions = user.predictions.length;
    const exactPercentage =
      totalPredictions > 0 ? round((exactCount / totalPredictions) * 100) : 0;
    const oneXTwoPercentage =
      totalPredictions > 0 ? round((oneXTwoCount / totalPredictions) * 100) : 0;

    // profit = баланс після всіх ставок
    const profit = round(balance);

    // ROI = (profit / кількість прогнозів) (виражено як відсоток на один прогноз)
    const roi = totalPredictions > 0 ? round(balance / totalPredictions) : 0;

    try {
      await prisma.results.upsert({
        where: { userId: user.id },
        update: {
          exactScore: exactCount,
          exactScorePercentage: exactPercentage,
          oneXTwo: oneXTwoCount,
          oneXTwoPercentage: oneXTwoPercentage,
          profit: profit,
          roi: roi,
        },
        create: {
          userId: user.id,
          exactScore: exactCount,
          exactScorePercentage: exactPercentage,
          oneXTwo: oneXTwoCount,
          oneXTwoPercentage: oneXTwoPercentage,
          profit: profit,
          roi: roi,
        },
      });

      console.log(
        `✅ ${user.id} -> exact=${exactCount} (${exactPercentage}%), 1X2=${oneXTwoCount} (${oneXTwoPercentage}%), profit=${profit}, roi=${roi}%`,
      );
    } catch (err) {
      console.error(`Failed to upsert results for user ${user.id}:`, err);
    }
  }
}

// Виклик:
(async () => {
  await calculateExactAnd1X2();
})();
