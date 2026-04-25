import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@c/ui/avatar";

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
        <Trophy className="h-5 w-5 text-primary" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Medal className="h-5 w-5 text-foreground/70" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">
        <Award className="h-5 w-5 text-orange-400" />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <span className="text-lg font-semibold text-muted-foreground">
        {rank}
      </span>
    </div>
  );
}

function TrendIndicator({
  trend,
  value,
}: {
  trend: "up" | "down" | "same";
  value?: number;
}) {
  if (trend === "up") {
    return (
      <div className="flex items-center gap-1 text-emerald-400">
        <TrendingUp className="h-4 w-4" />
        {value && <span className="text-xs font-medium">+{value}</span>}
      </div>
    );
  }
  if (trend === "down") {
    return (
      <div className="flex items-center gap-1 text-red-400">
        <TrendingDown className="h-4 w-4" />
        {value && <span className="text-xs font-medium">-{value}</span>}
      </div>
    );
  }
  return (
    <div className="flex items-center text-muted-foreground">
      <Minus className="h-4 w-4" />
    </div>
  );
}

function LeaderboardTable({ participants }: { participants: any }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Season <span className="text-primary">Leaderboard</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Top 10 predictors this season
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Table Header */}
          <div className="hidden border-b border-border bg-secondary/50 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
            <div className="col-span-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              #
            </div>
            <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Participant
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Points
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Predictions
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Accuracy
            </div>
            <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Trend
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {participants
              .slice(0, 10)
              .map((participant: any, index: number) => (
                <div
                  key={participant.id}
                  className={`grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/30 ${
                    index < 3 ? "bg-secondary/20" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 md:col-span-1">
                    <RankBadge rank={index + 1} />
                  </div>

                  {/* Participant Info */}
                  <div className="col-span-10 flex items-center gap-3 md:col-span-4">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarImage
                        src={participant.avatar}
                        alt={participant.username}
                      />
                      <AvatarFallback className="bg-secondary text-sm font-medium text-foreground">
                        {participant.username
                          .split(" ")
                          .map((p: string) => p[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {participant.username}
                      </p>
                      <p className="text-sm text-muted-foreground md:hidden">
                        {participant.results?.total} pts
                      </p>
                    </div>
                  </div>

                  {/* Points - Desktop */}
                  <div className="hidden text-center md:col-span-2 md:block">
                    <span className="text-xl font-bold text-primary">
                      {participant.results?.total}
                    </span>
                  </div>

                  {/* Predictions - Desktop */}
                  <div className="hidden text-center md:col-span-2 md:block">
                    <span className="text-foreground">10/20</span>
                  </div>

                  {/* Accuracy - Desktop */}
                  <div className="hidden text-center md:col-span-2 md:block">
                    <span className="font-medium text-foreground">
                      {20 - index}%
                    </span>
                  </div>

                  {/* Trend - Desktop */}
                  <div className="hidden justify-center md:col-span-1 md:flex">
                    <TrendIndicator
                      trend={participant.trend}
                      value={participant.trendValue}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
            View Full Leaderboard &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

export default LeaderboardTable;
