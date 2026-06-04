import { Trophy, Medal, Award } from "lucide-react";

export const RankBadge = ({ rank }: { rank: number }) => {
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
};
