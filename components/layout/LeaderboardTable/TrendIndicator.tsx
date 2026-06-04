import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const TrendIndicator = ({
  trend,
  value,
}: {
  trend: "up" | "down" | "same";
  value?: number;
}) => {
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
};
