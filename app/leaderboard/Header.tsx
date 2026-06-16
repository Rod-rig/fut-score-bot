import { Trophy } from "lucide-react";
import { Badge } from "@c/ui/badge";

export const Header = () => (
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
);
