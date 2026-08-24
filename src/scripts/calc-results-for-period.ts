import { oneXTwo, scoreMapping } from "../utils/score-mapping.js";
import { getResult } from "../utils/get-result.js";
import { round } from "../utils/round.js";
import { prisma } from "../../lib/prisma.ts";

type ResultField =
  | "total"
  | "england"
  | "spain"
  | "germany"
  | "france"
  | "italy"
  | "ukraine"
  | "international"
  | "prevMatchday"
  | "euroCups"
  | "twentyFour"
  | "twentyFive"
  | "twentySix"
  | "twentySeven";

/**
 * Порахувати результати користувачів у діапазоні дат і записати підсумок (total) в одне поле Results.
 *
 * @param startDateISO - початок періоду (включно), формат ISO або 'YYYY-MM-DD'
 * @param endDateISO - кінець періоду (включно), формат ISO або 'YYYY-MM-DD'
 * @param resultField - ім'я поля в моделі Results, куди записати підсумок (має бути одним із ResultField)
 */
async function calculateResultsForPeriod(
  startDateISO: string,
  endDateISO: string,
  resultField: ResultField,
): Promise<void> {
  // Валідація поля (додаткова, на випадок неоднозначності)
  const allowed: ResultField[] = [
    "total",
    "england",
    "spain",
    "germany",
    "france",
    "italy",
    "ukraine",
    "international",
    "prevMatchday",
    "euroCups",
    "twentyFour",
    "twentyFive",
    "twentySix",
    "twentySeven",
  ];
  if (!allowed.includes(resultField)) {
    throw new Error(
      `Invalid result field: ${resultField}. Allowed: ${allowed.join(", ")}`,
    );
  }

  const start = new Date(startDateISO);
  const end = new Date(endDateISO);
  end.setUTCHours(23, 59, 59, 999);

  // Отримуємо всіх користувачів з прогнозами у вказаному періоді
  const users = await prisma.user.findMany({
    include: {
      results: true,
      predictions: {
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
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

  for (const user of users) {
    let sum = 0;

    for (const prediction of user.predictions) {
      const expected = prediction.value;
      const actual = prediction.event?.score;

      if (!actual) {
        continue;
      }

      const [homeStr, awayStr] = actual.split(":");
      const homeGoals = Number(homeStr);
      const awayGoals = Number(awayStr);

      if (
        actual === expected ||
        (expected &&
          expected.toLowerCase() === "any other" &&
          (homeGoals > 3 || awayGoals > 3))
      ) {
        const pts =
          prediction.event?.odd?.[
            scoreMapping(actual) as keyof typeof prediction.event.odd
          ] ?? 0;
        sum += pts;
      } else if (getResult(actual) === getResult(expected)) {
        const pts =
          prediction.event?.odd?.[
            oneXTwo(getResult(expected)) as keyof typeof prediction.event.odd
          ] ?? 0;
        sum += pts;
      }
    }

    // Ми записуємо AGGREGATED total в одне поле, ім'я якого прийшло в параметрі resultField
    const valueToWrite = round(sum);

    try {
      // Prisma не дозволяє динамічно типізований ключ без приведення; приведемо як any
      const updatePayload: any = { [resultField]: valueToWrite };
      const createPayload: any = {
        userId: user.id,
        [resultField]: valueToWrite,
      };

      await prisma.results.upsert({
        where: { userId: user.id },
        update: updatePayload,
        create: createPayload,
      });

      console.log(`✅ ${user.id} - wrote ${valueToWrite} into ${resultField}`);
    } catch (err) {
      console.error(`Failed to upsert results for user ${user.id}:`, err);
    }
  } // end for users
}

// Приклад виклику (розкоментуйте й викличте із середовища, яке підтримує top-level await або в async IIFE):
(async () => {
  await calculateResultsForPeriod("2026-08-01", "2027-07-16", "twentySeven");
})();
