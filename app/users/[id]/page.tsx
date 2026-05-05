import Link from "next/link";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Target } from "lucide-react";
import { Badge } from "@c/ui/badge";
import Flag from "@c/shared/Flag";
import { prisma } from "@l/prisma";
import { getUserInitials } from "@u/getUserInitials";
import { evaluatePrediction } from "@u/evaluatePrediction";

// const userData = {
//   username: "Vadim",
//   initials: "VA",
//   joinDate: "March 2024",
//   rank: 1,
//   totalPoints: 1177.9,
//   stats: {
//     totalPredictions: 717,
//     correctPredictions: 234,
//     accuracy: 32.6,
//     currentStreak: 5,
//     bestStreak: 12,
//     avgPointsPerWeek: 11.34,
//     perfectScores: 18,
//   },
//   seasonStats: {
//     position: 1,
//     pointsToNext: 0,
//     pointsFromPrevious: 31.21,
//   },
//   recentPredictions: [
//     {
//       match: "Manchester United vs Liverpool",
//       prediction: "2-1",
//       actual: "2-1",
//       points: 3.0,
//       correct: true,
//     },
//     {
//       match: "Real Madrid vs Barcelona",
//       prediction: "3-2",
//       actual: "2-2",
//       points: 0.5,
//       correct: false,
//     },
//     {
//       match: "Bayern vs Dortmund",
//       prediction: "3-1",
//       actual: "3-1",
//       points: 3.0,
//       correct: true,
//     },
//     {
//       match: "Inter vs AC Milan",
//       prediction: "1-0",
//       actual: "1-1",
//       points: 0.5,
//       correct: false,
//     },
//     {
//       match: "PSG vs Marseille",
//       prediction: "2-0",
//       actual: "2-0",
//       points: 3.0,
//       correct: true,
//     },
//     {
//       match: "Chelsea vs Arsenal",
//       prediction: "1-2",
//       actual: "0-2",
//       points: 1.5,
//       correct: false,
//     },
//   ],
//   weeklyPoints: [
//     { week: "GW 30", points: 11.34 },
//     { week: "GW 29", points: 8.92 },
//     { week: "GW 28", points: 14.5 },
//     { week: "GW 27", points: 6.78 },
//     { week: "GW 26", points: 12.1 },
//     { week: "GW 25", points: 9.45 },
//   ],
// };

type UserWithPredictions = Prisma.UserGetPayload<{
  include: {
    predictions: { include: { event: { include: { odd: true } } } };
    results: true;
  };
}>;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const take = 10;
  const { id } = await params;
  const user: UserWithPredictions | null = await prisma.user.findUnique({
    where: { id },
    include: {
      predictions: {
        take,
        where: { event: { score: { not: null } } },
        orderBy: { createdAt: "desc" },
        include: { event: { include: { odd: true } } },
      },
      results: true,
    },
  });

  if (!user) {
    notFound();
  }

  const count = await prisma.prediction.count({ where: { userId: id } });
  return (
    <>
      <div className="mb-8 rounded-xl border border-border/40 bg-card/50 sm:p-8 p-2">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 sm:gap-6">
            <div className="flex h-18 sm:h-24 w-18 sm:w-24 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-foreground">
              {getUserInitials(user?.firstName ?? "", user?.lastName ?? "")}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {user?.firstName} {user?.lastName}
                </h1>
                {/*<Badge className="bg-primary text-primary-foreground">
                  #9999
                </Badge>*/}
              </div>
              <p className="mt-1 text-muted-foreground">
                {/* @ts-ignore */}
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
              {Boolean(user?.results) && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user?.results?.total}
                  </span>
                  <span className="text-muted-foreground">points</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{count}</p>
              <p className="text-sm text-muted-foreground">Total Predictions</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="🏴󠁧󠁢󠁥󠁮󠁧󠁿" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.england}
              </p>
              <p className="text-sm text-muted-foreground">England points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="🇪🇸" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.spain}
              </p>
              <p className="text-sm text-muted-foreground">Spain points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="🇩🇪" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.germany}
              </p>
              <p className="text-sm text-muted-foreground">Germany points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="🇮🇹" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.italy}
              </p>
              <p className="text-sm text-muted-foreground">Italy points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="🇫🇷" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.france}
              </p>
              <p className="text-sm text-muted-foreground">France points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="un" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.euroCups}
              </p>
              <p className="text-sm text-muted-foreground">Euro cups points</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flag name="un" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {user?.results?.international}
              </p>
              <p className="text-sm text-muted-foreground">
                International points
              </p>
            </div>
          </div>
        </div>
        {/*<div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">9999%</p>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">9999</p>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">9999</p>
              <p className="text-sm text-muted-foreground">Perfect Scores</p>
            </div>
          </div>
        </div>*/}
      </div>

      {user.predictions.length > 0 && (
        <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
          <div className="p-6 border-b border-border/40">
            <h3 className="text-lg font-semibold text-foreground">
              {take} Recent Predictions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Match</th>
                  <th className="px-6 py-4 font-medium text-center">
                    Your Prediction
                  </th>
                  <th className="px-6 py-4 font-medium text-center">
                    Actual Result
                  </th>
                  <th className="px-6 py-4 font-medium text-center">Points</th>
                  <th className="px-6 py-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {user?.predictions.map((pred, index) => {
                  const { points, status } = evaluatePrediction(
                    pred,
                    pred.event,
                  );
                  const isCorrect = status === "Correct";
                  const isInCorrect = status === "Incorrect";
                  return (
                    <tr key={index} className="hover:bg-primary/5">
                      <td className="px-6 py-4 text-foreground">
                        <Link href={`/events/${pred.event.id}`}>
                          {pred.event.home} vs {pred.event.away}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-foreground">
                        {pred.value}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-primary">
                        {pred.event.score}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-primary">
                        +{points}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={
                            isCorrect
                              ? "default"
                              : isInCorrect
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            isCorrect
                              ? "bg-primary/20 text-primary"
                              : isInCorrect
                                ? "bg-destructive/20 text-destructive"
                                : "bg-secondary text-muted-foreground"
                          }
                        >
                          {status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/*<div className="rounded-xl border border-border/40 bg-card/50 p-6">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Weekly Points History
        </h3>
        <div className="space-y-4">
          {userData.weeklyPoints.map((week, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-muted-foreground">{week.week}</span>
              <div className="flex items-center gap-4">
                <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(week.points / 15) * 100}%` }}
                  />
                </div>
                <span className="w-16 text-right font-semibold text-primary">
                  {week.points.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-secondary/30 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Best Streak</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.stats.bestStreak} correct
            </p>
          </div>
          <div className="rounded-lg bg-secondary/30 p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Avg Points/Week
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {userData.stats.avgPointsPerWeek.toFixed(2)}
            </p>
          </div>
        </div>
      </div>*/}
    </>
  );
}
