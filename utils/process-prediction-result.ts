import { isAnyOther, isAnyOtherScore } from "./is-any-other.ts";
import { getResult } from "../src/utils/get-result.js";

export type PredictionStats = {
  exactCount: number;
  oneXTwoCount: number;
  balance: number;
};

type OddValues = {
  one?: number;
  two?: number;
  x?: number;
};

type PredictionLike = {
  value: string;
  event?: {
    score?: string;
    odd?: OddValues;
  };
};

const getOddKey = (score: string): "one" | "two" | "x" => {
  const result = getResult(score);
  return result === "1" ? "one" : result === "2" ? "two" : "x";
};

const applyOddsProfit = (
  balance: number,
  score: string,
  odd: OddValues | undefined,
  stake: number,
): number => {
  const key = getOddKey(score);
  const oddValue = odd?.[key] ?? 1;
  return Math.round(balance + (oddValue - 1) * stake);
};

export const processPredictionResult = (
  prediction: PredictionLike,
  current: PredictionStats,
  stake = 100,
): PredictionStats => {
  const expected = prediction.value;
  const actual = prediction.event?.score;

  if (!actual) {
    return current;
  }

  const expectedIsAnyOther = isAnyOther(expected);
  const isExact =
    expected === actual || (expectedIsAnyOther && isAnyOtherScore(actual));

  if (isExact) {
    const next = { ...current };
    next.exactCount += 1;
    next.oneXTwoCount += 1;

    if (!expectedIsAnyOther) {
      next.balance = applyOddsProfit(
        next.balance,
        expected,
        prediction.event?.odd,
        stake,
      );
    }

    return next;
  }

  if (expectedIsAnyOther) {
    return current;
  }

  try {
    const next = { ...current };

    if (getResult(actual) === getResult(expected)) {
      next.oneXTwoCount += 1;
      next.balance = applyOddsProfit(
        next.balance,
        expected,
        prediction.event?.odd,
        stake,
      );
    } else {
      next.balance -= stake;
    }

    return next;
  } catch {
    return {
      ...current,
      balance: current.balance - stake,
    };
  }
};
