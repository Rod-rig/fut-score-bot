import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@c/ui/avatar";
import { Button } from "@c/ui/button";
import { RankBadge } from "./RankBadge";
import { getUserInitials } from "@u/getUserInitials";
// import { TrendIndicator } from "./TrendIndicator";

type Participant = Prisma.UserGetPayload<{
  include: { results: true; predictions: true };
}>;

const LeaderboardTable = ({
  participants,
}: {
  participants: Participant[];
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Season <span className="text-primary">Leaderboard</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Top 10 predictors
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Table Header */}
          <div className="hidden border-b border-border bg-secondary/50 px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
            <div className="col-span-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Position
            </div>
            <div className="col-span-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Participant
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Predictions
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Prev Gameweek Points
            </div>
            <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Points ↓
            </div>
            {/*<div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Accuracy
            </div>
            <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Trend
            </div>*/}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {participants.map((participant: Participant, index: number) => (
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
                <div className="col-span-10 flex items-center gap-3 md:col-span-5">
                  <Avatar className="h-10 w-10 border-2 border-border">
                    {/*<AvatarImage
                        // src={participant.avatar}
                        src={participant.username}
                        alt={participant.username}
                      />*/}
                    <AvatarFallback className="bg-secondary text-sm font-medium text-foreground">
                      {getUserInitials(
                        participant.firstName,
                        participant.lastName,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {participant.firstName && participant.lastName
                        ? `${participant.firstName} ${participant.lastName}`
                        : participant.username}
                    </p>
                    <p className="text-sm text-muted-foreground md:hidden">
                      {participant.results?.total} pts
                    </p>
                  </div>
                </div>

                {/* Predictions - Desktop */}
                <div className="hidden text-center md:col-span-2 md:block">
                  <span className="text-foreground">
                    {participant.predictions.length}
                  </span>
                </div>

                {/* Prev Gameweek Points - Desktop */}
                <div className="hidden text-center md:col-span-2 md:block">
                  <span className="text-foreground">
                    {participant.results?.prevMatchday}
                  </span>
                </div>

                {/* Points - Desktop */}
                <div className="hidden text-center md:col-span-2 md:block">
                  <span className="text-xl font-bold text-primary">
                    {participant.results?.total}
                  </span>
                </div>

                {/* Accuracy - Desktop */}
                {/*<div className="text-center md:col-span-2">
                    <span className="font-medium text-foreground">
                      {20 - index}%
                    </span>
                  </div>*/}

                {/* Trend - Desktop */}
                {/*<div className="justify-center md:col-span-1">
                    <TrendIndicator
                      trend={participant.trend}
                      value={participant.trendValue}
                    />
                  </div>*/}
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium text-primary transition-colors hover:text-primary hover:bg-muted"
          >
            <Link href="/leaderboard">View Full Leaderboard &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardTable;
