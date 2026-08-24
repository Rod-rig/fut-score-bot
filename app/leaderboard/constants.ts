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
  euroCups: { label: "Eurocups", filter: "euroCups" },
  international: { label: "International", filter: "international" },
  prevMatchday: { label: "Prev GW", filter: "prevMatchday" },
  twentyFour: { label: "2023/24", filter: "twentyFour" },
  twentyFive: { label: "2024/25", filter: "twentyFive" },
  twentySix: { label: "2025/26", filter: "twentySix" },
  twentySeven: { label: "2026/27", filter: "twentySeven" },
  exactScore: { label: "Correct Score", filter: "exactScore" },
  exactScorePercentage: {
    label: "Correct Score, %",
    filter: "exactScorePercentage",
  },
  oneXTwo: { label: "Correct 1X2", filter: "oneXTwo" },
  oneXTwoPercentage: {
    label: "Correct 1X2, %",
    filter: "oneXTwoPercentage",
  },
  profit: { label: "Overall Profit", filter: "profit" },
  roi: {
    label: "ROI",
    filter: "roi",
  },
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
