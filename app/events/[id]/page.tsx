import {
  Calendar,
  Clock,
  ArrowLeft,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Circle,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { notFound, redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Badge } from "@c/ui/badge";
import Flag from "@c/shared/Flag";
import { prisma } from "@l/prisma";
import { formatCustomDate } from "@u/formatCustomDate";
import { getUserInitials } from "@u/getUserInitials";
import { calculateAverageScore } from "@u/calculateAverageScore";
import { evaluatePrediction } from "@u/evaluatePrediction";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type EventWithPredictions = Prisma.EventGetPayload<{
  include: { predictions: { include: { user: true } }; odd: true };
}> | null;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const { id } = await params;
  if (!id || isNaN(parseInt(id))) {
    notFound();
  }

  const eventId = parseInt(id);
  const userId = session.user.id;
  const event: EventWithPredictions = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      predictions: { orderBy: { updatedAt: "asc" }, include: { user: true } },
      odd: true,
    },
  });

  if (!event) {
    notFound();
  }

  const currentUserPrediction = await prisma.prediction.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  const { points, status } = evaluatePrediction(currentUserPrediction, event);
  const scores = event.predictions.map((p) => p.value);
  const averageScore = calculateAverageScore(scores);
  const { date, hours } = formatCustomDate(event.startDate);
  const isFinished = event.status === "FINISHED" && event.score;
  let home;
  let away;
  if (isFinished) {
    [home, away] = event.score.split(":");
  }
  return (
    <>
      {/* Back Button */}
      <Link
        href="/create-predictions"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Matches
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Match Card */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-4 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Badge variant="outline">{event.tournament}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {hours}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-8">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-secondary-foreground">
                  <Flag name={event.flagHome} size={40} />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {event.home}
                </h2>
                <p className="text-sm text-muted-foreground">Home</p>
              </div>

              <div className="px-2 sm:px-8">
                {isFinished ? (
                  <div className="text-center">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-bold text-foreground">
                        {home}
                      </span>
                      <span className="text-2xl font-bold text-muted-foreground">
                        :
                      </span>
                      <span className="text-5xl font-bold text-foreground">
                        {away}
                      </span>
                    </div>
                    {isFinished && (
                      <p className="mt-2 text-sm text-primary font-medium">
                        Final Score
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-muted-foreground">
                    VS
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-secondary-foreground">
                  <Flag name={event.flagAway} size={40} />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {event.away}
                </h2>
                <p className="text-sm text-muted-foreground">Away</p>
              </div>
            </div>

            {/* Betting Odds */}
            <div className="rounded-xl border border-border/40 bg-card/50 p-4 sm:p-6">
              <h3 className="mb-6 text-lg font-semibold text-foreground">
                Betting Odds
              </h3>

              {/* Match Result Odds (1X2) */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                  Match Result
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-secondary/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Home Win (1)
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {event?.odd?.one}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Draw (X)
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {event?.odd?.x}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Away Win (2)
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {event?.odd?.two}
                    </p>
                  </div>
                </div>
              </div>

              {/* Correct Score Odds */}
              <div>
                <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                  Correct Score
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">0:0</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.zeroZero}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">1:1</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.oneOne}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">2:2</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.twoTwo}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">1:0</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.oneZero}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">2:0</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.twoZero}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">3:0</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.threeZero}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">2:1</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.twoOne}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">3:1</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.threeOne}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">3:2</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.threeTwo}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">0:1</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.zeroOne}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">0:2</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.zeroTwo}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">0:3</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.zeroThree}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">1:2</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.oneTwo}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">1:3</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.oneThree}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">2:3</p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.twoThree}
                    </p>
                  </div>
                  <div className="rounded-lg p-3 text-center bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      Any Other
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {event?.odd?.anyOther}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User's Prediction Result */}
          {isFinished && currentUserPrediction !== null && (
            <div className="rounded-xl border border-primary/50 bg-card/50 p-6">
              <h3 className="mb-6 text-lg font-semibold text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Your Prediction Result
              </h3>

              {/* User's prediction vs actual result */}
              <div className="space-y-4">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    Your Prediction
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="flex-1 text-sm font-medium text-muted-foreground text-right">
                      {event.home}
                    </span>
                    <span className="text-3xl font-bold text-foreground">
                      {currentUserPrediction.value}
                    </span>
                    <span className="flex-1 text-sm font-medium text-muted-foreground">
                      {event.away}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-primary/10 border border-primary/30 p-4">
                  <p className="text-xs text-muted-foreground mb-2 text-center">
                    Final Result
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="flex-1 text-sm font-medium text-muted-foreground text-right">
                      {event.home}
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      {event.score}
                    </span>
                    <span className="flex-1 text-sm font-medium text-muted-foreground">
                      {event.away}
                    </span>
                  </div>
                </div>

                {/* Points earned */}
                {status === "Correct" ? (
                  <div className="rounded-lg bg-primary/20 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Exact Score!
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-primary">+{points}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Points Earned
                    </p>
                  </div>
                ) : status === "Partial" ? (
                  <div className="rounded-lg bg-primary/5 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Circle className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Exact Result
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-primary">+{points}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Points Earned
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg bg-destructive/10 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="text-sm font-medium text-destructive">
                        Incorrect Result
                      </span>
                    </div>
                    <p className="text-3xl font-bold">+{points}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Points Earned
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Match Stats */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Match Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Total Predictions
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  {event?.predictions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Avg Home Goals
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  {averageScore.home}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Avg Away Goals
                  </span>
                </div>
                <span className="font-semibold text-foreground">
                  {averageScore.away}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Predictions */}
          <div className="rounded-xl border border-border/40 bg-card/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Predictions
            </h3>
            <div className="space-y-3">
              {event?.predictions.map((pred, index) => {
                const { date, hours } = formatCustomDate(pred.createdAt);
                const { status } = evaluatePrediction(pred, event);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                        {getUserInitials(
                          pred.user.firstName,
                          pred.user.lastName,
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          <Link href={`/users/${pred.user.id}`}>
                            {pred.user.username
                              ? pred.user.username
                              : pred.user.firstName}
                          </Link>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {date} {hours}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">
                        {pred.value}
                      </span>
                      {isFinished && (
                        <>
                          {status.toLowerCase() === "correct" && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                          {status.toLowerCase() === "incorrect" && (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          {status.toLowerCase() === "partial" && (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
