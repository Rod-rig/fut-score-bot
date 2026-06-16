import { Prisma } from "@prisma/client";

export const defaultFilter = "total";

export const filtersMap: Record<string, { label: string; filter: string }> = {
  [defaultFilter]: { label: "Total", filter: defaultFilter },
  england: { label: "England", filter: "england" },
  germany: { label: "Germany", filter: "germany" },
  spain: { label: "Spain", filter: "spain" },
  italy: { label: "Italy", filter: "italy" },
  france: { label: "France", filter: "france" },
  ukraine: { label: "Ukraine", filter: "ukraine" },
  euroCups: { label: "Euro cups", filter: "euroCups" },
  international: { label: "International", filter: "international" },
  prevMatchday: { label: "Previous GW", filter: "prevMatchday" },
  // { label: "2023/2024", value: "2024" },
  // { label: "2024/2025", value: "2025" },
  // { label: "2025/2026", value: "2026" },
} as const;

export const select = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    results: true,
    _count: { select: { predictions: true } },
  },
} satisfies Prisma.UserDefaultArgs;
