import { prisma } from "@l/prisma";
import { defaultFilter, filtersMap, select } from "./constants";
import { User } from "./types";

export const getUsersByFilter = async (key?: string): Promise<User[]> => {
  const sortField = key && key in filtersMap ? key : defaultFilter;

  return prisma.user.findMany({
    ...select,
    orderBy:
      sortField === "total"
        ? [{ results: { total: "desc" } }, { predictions: { _count: "desc" } }]
        : [
            { results: { [sortField]: "desc" } },
            { predictions: { _count: "desc" } },
          ],
  });
};

export const getPoints = (user: User, filter?: string): number => {
  if (!filter) return user?.results?.[defaultFilter] ?? 0;
  return user.results?.[filtersMap[filter].filter] ?? 0;
};
