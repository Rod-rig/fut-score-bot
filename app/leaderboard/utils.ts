import { prisma } from "@l/prisma";
import {
  defaultFilter,
  filtersMap,
  numberOfPredictionsOptions,
  select,
} from "./constants";
import { User } from "./types";

export const getUsersByFilter = async (
  filter?: string,
  numberOfPredictions?: string,
): Promise<User[]> => {
  const sortField = filter && filter in filtersMap ? filter : defaultFilter;
  const minPredictions = numberOfPredictions
    ? Number(numberOfPredictions)
    : undefined;

  const users = await prisma.user.findMany({
    ...select,
    orderBy:
      sortField === "total"
        ? [{ results: { total: "desc" } }, { predictions: { _count: "desc" } }]
        : [
            { results: { [sortField]: "desc" } },
            { predictions: { _count: "desc" } },
          ],
  });

  if (minPredictions === undefined || Number.isNaN(minPredictions)) {
    return users;
  }

  return users.filter(
    (user) => (user._count?.predictions ?? 0) >= minPredictions,
  );
};

export const getPoints = (user: User, filter?: string): number => {
  const key =
    filter && filter in filtersMap
      ? filtersMap[filter as keyof typeof filtersMap].filter
      : defaultFilter;

  const value = user.results?.[key as keyof NonNullable<typeof user.results>];

  return typeof value === "number" ? value : 0;
};

const validNumberOfPredictionsValues = numberOfPredictionsOptions.map(
  ({ value }) => value,
);

export const isValidNumberOfPredictions = (value: string | null) =>
  !!value && validNumberOfPredictionsValues.some((option) => option === value);

export const normalizeNumberOfPredictions = (
  value: string | null,
): string => {
  if (isValidNumberOfPredictions(value)) {
    return value as (typeof validNumberOfPredictionsValues)[number];
  }

  return "0";
};
