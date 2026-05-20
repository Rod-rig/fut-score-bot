import Link from "next/link";
import { Trophy, Medal } from "lucide-react";
import { Badge } from "@c/ui/badge";
import { prisma } from "@l/prisma";
import { getUserInitials } from "@u/getUserInitials";

/*
const leaderboardData = [
  {
    position: 1,
    change: 0,
    name: "Vadim",
    initials: "VA",
    predictions: 717,
    prevPoints: 11.34,
    points: 1177.9,
  },
  {
    position: 2,
    change: 1,
    name: "Copilot AI",
    initials: "CO",
    predictions: 706,
    prevPoints: 6.92,
    points: 1146.69,
  },
  {
    position: 3,
    change: -1,
    name: "Forebet",
    initials: "FO",
    predictions: 693,
    prevPoints: 3.74,
    points: 1118.23,
  },
  {
    position: 4,
    change: 0,
    name: "Predictz",
    initials: "PR",
    predictions: 656,
    prevPoints: 11.34,
    points: 1106.59,
  },
  {
    position: 5,
    change: 2,
    name: "Kostya Pomaranskiy",
    initials: "KP",
    predictions: 711,
    prevPoints: 3.74,
    points: 1087.04,
  },
  {
    position: 6,
    change: -1,
    name: "xgscore.io",
    initials: "XG",
    predictions: 632,
    prevPoints: 1.46,
    points: 1058.19,
  },
  {
    position: 7,
    change: -1,
    name: "Average",
    initials: "AV",
    predictions: 711,
    prevPoints: 6.92,
    points: 1021.97,
  },
  {
    position: 8,
    change: 0,
    name: "Football.ua",
    initials: "FO",
    predictions: 499,
    prevPoints: 7.6,
    points: 804.55,
  },
  {
    position: 9,
    change: 3,
    name: "Gemini AI",
    initials: "GE",
    predictions: 393,
    prevPoints: 6.92,
    points: 586.27,
  },
  {
    position: 10,
    change: -1,
    name: "oksana_brukhno",
    initials: "OK",
    predictions: 328,
    prevPoints: 9.88,
    points: 379.11,
  },
  {
    position: 11,
    change: 0,
    name: "SportAnalyzer",
    initials: "SA",
    predictions: 298,
    prevPoints: 5.43,
    points: 356.82,
  },
  {
    position: 12,
    change: 2,
    name: "MatchPredictor",
    initials: "MP",
    predictions: 312,
    prevPoints: 8.21,
    points: 341.56,
  },
  {
    position: 13,
    change: -2,
    name: "GoalMaster",
    initials: "GM",
    predictions: 287,
    prevPoints: 4.12,
    points: 328.94,
  },
  {
    position: 14,
    change: 1,
    name: "StatisticsKing",
    initials: "SK",
    predictions: 265,
    prevPoints: 7.89,
    points: 312.45,
  },
  {
    position: 15,
    change: -1,
    name: "PredictBoss",
    initials: "PB",
    predictions: 243,
    prevPoints: 3.56,
    points: 298.76,
  },
];
*/

function getPositionIcon(position: number) {
  if (position === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
  if (position === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (position === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-muted-foreground">{position}</span>;
}

/*
function getChangeIndicator(change: number) {
  if (change > 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-green-500">
        <TrendingUp className="h-3 w-3" />
        {change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="flex items-center gap-1 text-xs text-red-500">
        <TrendingDown className="h-3 w-3" />
        {Math.abs(change)}
      </span>
    );
  }
  return <Minus className="h-3 w-3 text-muted-foreground" />;
}
*/

export default async function Page() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      results: { select: { total: true, prevMatchday: true } },
      _count: { select: { predictions: true } },
    },
    orderBy: [
      { results: { total: "desc" } },
      { predictions: { _count: "desc" } },
    ],
  });

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge
          variant="outline"
          className="mb-4 border-primary/50 bg-primary/10 text-primary"
        >
          <Trophy className="mr-2 h-3 w-3" />
          Season 2025/26
        </Badge>
        <h1 className="text-4xl font-bold text-foreground">
          <span className="text-foreground">Season </span>
          <span className="text-primary">Leaderboard</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Compete for the top spot and prove your prediction skills
        </p>
      </div>

      {/* Top 3 Podium */}
      {users?.length > 2 && (
        <div className="mb-12 flex items-end justify-center gap-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-8 sm:h-16 w-8 sm:w-16 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground">
              {getUserInitials(users[1].firstName, users[1].lastName)}
            </div>
            <p className="font-medium text-foreground">
              {users[1].username ? users[1].username : users[1].firstName}
            </p>
            <p className="text-sm text-primary">
              {users[1]?.results.total} pts
            </p>
            <div className="mt-4 flex h-24 w-18 sm:w-24 items-center justify-center rounded-t-xl bg-linear-to-t from-gray-500/20 to-gray-400/30">
              <Medal className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-10 sm:h-20 w-10 sm:w-20 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
              {getUserInitials(users[0].firstName, users[0].lastName)}
            </div>
            <p className="font-medium text-foreground">
              {users[0].username ? users[0].username : users[0].firstName}
            </p>
            <p className="text-sm text-primary">
              {users[0]?.results.total} pts
            </p>
            <div className="mt-4 flex h-32 w-21 sm:w-28 items-center justify-center rounded-t-xl bg-linear-to-t from-yellow-500/20 to-yellow-400/30">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-8 sm:h-16 w-8 sm:w-16 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground">
              {getUserInitials(users[2].firstName, users[2].lastName)}
            </div>
            <p className="font-medium text-foreground">
              {users[2].username ? users[2].username : users[2].firstName}
            </p>
            <p className="text-sm text-primary">
              {users[2]?.results.total} pts
            </p>
            <div className="mt-4 flex h-20 w-18 sm:w-24 items-center justify-center rounded-t-xl bg-linear-to-t from-amber-600/20 to-amber-500/30">
              <Medal className="h-8 w-8 text-amber-600" />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-medium w-20">Position</th>
                {/*<th className="px-6 py-4 font-medium w-16">Change</th>*/}
                <th className="px-6 py-4 font-medium">Participant</th>
                <th className="px-6 py-4 font-medium text-center">
                  Predictions
                </th>
                <th className="px-6 py-4 font-medium text-center">
                  Prev Gameweek
                </th>
                <th className="px-6 py-4 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {users.map((user, index) => (
                <tr
                  key={index + 1}
                  className="transition-colors hover:bg-primary/5"
                >
                  <td className="px-6 py-4">
                    <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                      {getPositionIcon(index + 1)}
                    </span>
                  </td>
                  {/*<td className="px-6 py-4">
                    {getChangeIndicator(user.change)}
                  </td>*/}
                  <td className="px-6 py-4">
                    <Link
                      href={`/users/${user.id}`}
                      className="flex items-center gap-3 hover:text-primary"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                        {getUserInitials(user.firstName, user.lastName)}
                      </div>
                      <span className="font-medium text-foreground">
                        {user.username ? user.username : user.firstName}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">
                    {user._count.predictions ?? 0}
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">
                    {user?.results?.prevMatchday}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-primary">
                    {user?.results?.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
