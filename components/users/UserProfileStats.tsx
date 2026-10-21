"use client";

import { useState } from "react";
import { Prisma } from "@prisma/client";
import { Target, Trophy } from "lucide-react";
import Flag from "@c/shared/Flag";

type UserWithPredictions = Prisma.UserGetPayload<{
  include: {
    predictions: { include: { event: { include: { odd: true } } } };
    results: true;
  };
}>;

type UserProfileStatsProps = {
  user: UserWithPredictions;
  count: number;
};

export default function UserProfileStats({
  user,
  count,
}: UserProfileStatsProps) {
  const [showAllStats, setShowAllStats] = useState(false);

  const stats = [
    {
      id: "totalPredictions",
      icon: <Target className="h-5 w-5" />,
      value: count,
      label: "Total Predictions",
    },
    {
      id: "totalPoints",
      icon: <Trophy className="h-5 w-5" />,
      value: user?.results?.total ?? 0,
      label: "Total Points",
    },
    {
      id: "twentySeven",
      icon: "26/27",
      value: user?.results?.twentySeven ?? 0,
      label: "2026/27 season points",
    },
    {
      id: "roi",
      icon: "ROI",
      value: `${user?.results?.roi ?? 0}%`,
      label: "Return on investment",
    },
    {
      id: "england",
      icon: <Flag name="🏴󠁧󠁢󠁥󠁮󠁧󠁿" />,
      value: user?.results?.england ?? 0,
      label: "England points",
    },
    {
      id: "spain",
      icon: <Flag name="🇪🇸" />,
      value: user?.results?.spain ?? 0,
      label: "Spain points",
    },
    {
      id: "germany",
      icon: <Flag name="🇩🇪" />,
      value: user?.results?.germany ?? 0,
      label: "Germany points",
    },
    {
      id: "italy",
      icon: <Flag name="🇮🇹" />,
      value: user?.results?.italy ?? 0,
      label: "Italy points",
    },
    {
      id: "france",
      icon: <Flag name="🇫🇷" />,
      value: user?.results?.france ?? 0,
      label: "France points",
    },
    {
      id: "ukraine",
      icon: <Flag name="🇺🇦" />,
      value: user?.results?.ukraine ?? 0,
      label: "Ukraine points",
    },
    {
      id: "euroCups",
      icon: <Flag name="un" />,
      value: user?.results?.euroCups ?? 0,
      label: "Euro cups points",
    },
    {
      id: "international",
      icon: <Flag name="un" />,
      value: user?.results?.international ?? 0,
      label: "International points",
    },
    {
      id: "twentyFour",
      icon: "23/24",
      value: user?.results?.twentyFour ?? 0,
      label: "2023/24 season points",
    },
    {
      id: "twentyFive",
      icon: "24/25",
      value: user?.results?.twentyFive ?? 0,
      label: "2024/25 season points",
    },
    {
      id: "twentySix",
      icon: "25/26",
      value: user?.results?.twentySix ?? 0,
      label: "2025/26 season points",
    },

    {
      id: "exactScore",
      icon: "CS",
      value: user?.results?.exactScore ?? 0,
      label: "Number of correct scores",
    },
    {
      id: "exactScorePercentage",
      icon: "CS%",
      value: `${user?.results?.exactScorePercentage ?? 0}%`,
      label: "Percentage of correct scores",
    },
    {
      id: "oneXTwo",
      icon: "1x2",
      value: user?.results?.oneXTwo ?? 0,
      label: "Number of correct 1x2",
    },
    {
      id: "oneXTwoPercentage",
      icon: "1x2%",
      value: `${user?.results?.oneXTwoPercentage ?? 0}%`,
      label: "Percentage of correct 1x2",
    },
    {
      id: "profit",
      icon: "OP",
      value: `${user?.results?.profit ?? 0}$`,
      label: "Overall profit",
    },
  ];

  const visibleStats = showAllStats ? stats : stats.slice(0, 4);

  return (
    <div className="mb-8 ">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibleStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-border/40 bg-card/50 p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {typeof stat.icon === "string" ? stat.icon : stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setShowAllStats((visible: boolean) => !visible)}
          className="rounded-md border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          {showAllStats ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
