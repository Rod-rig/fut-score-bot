"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@c/ui/chart";
import { processPredictionResult } from "@u/process-prediction-result";
import { round } from "../../src/utils/round";

type RoiPoint = {
  match: string;
  index: number;
  roi: number;
  previousRoi: number;
  roiDiff: number;
};

export default function UserRoiChart({
  predictions,
  currentRoi,
}: {
  predictions: any[];
  currentRoi: number;
}) {
  const MAX_PREDICTIONS = 50;

  const chartData = useMemo<RoiPoint[]>(() => {
    const initialStats = {
      exactCount: 0,
      oneXTwoCount: 0,
      balance: 0,
    };

    return predictions
      .reverse()
      .reduce<{
        stats: typeof initialStats;
        previousRoi: number;
        points: RoiPoint[];
      }>(
        (acc, prediction, index) => {
          const nextStats = processPredictionResult(prediction, acc.stats);
          const totalSeen = index + 1;
          const currentRoiValue = round(nextStats.balance / totalSeen);
          const previousRoi =
            acc.points[acc.points.length - 1]?.roi ?? currentRoiValue;
          const roiDiff = round(currentRoiValue - previousRoi);

          return {
            stats: nextStats,
            previousRoi: currentRoiValue,
            points: [
              ...acc.points,
              {
                index: index + 1,
                match: `${prediction.event?.home} vs ${prediction.event?.away}`,
                roi: currentRoiValue,
                previousRoi,
                roiDiff,
              },
            ],
          };
        },
        { stats: initialStats, previousRoi: 0, points: [] },
      )
      .points.slice(-MAX_PREDICTIONS);
  }, [predictions]);

  const growthDiff =
    chartData.length > 1
      ? round(chartData[chartData.length - 1].roi - chartData[0].roi)
      : 0;
  const gap =
    chartData.length > MAX_PREDICTIONS ? MAX_PREDICTIONS : chartData.length;
  const isRoiGrowing = chartData.length > 1 && growthDiff >= 0;
  const RoiChangeIcon = isRoiGrowing ? ArrowUpRight : ArrowDownRight;

  return (
    <section
      aria-labelledby="roi-activity"
      className="mb-8 rounded-xl border border-border/40 bg-card/50 p-6"
    >
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="roi-activity"
            className="text-lg font-semibold text-foreground"
          >
            ROI activity (last {gap} predictions)
          </h2>
          <p className="text-sm text-muted-foreground">
            How your return has changed across recent gameweeks
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="text-sm font-medium text-foreground">
            Current ROI: {currentRoi}%
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              isRoiGrowing ? "text-primary" : "text-destructive"
            }`}
            aria-label={`${isRoiGrowing ? "Increase" : "Decrease"} of ${growthDiff} percent across the last ${gap} predictions`}
          >
            <RoiChangeIcon className="h-4 w-4" aria-hidden="true" />
            {growthDiff}% in last {gap} predictions
          </span>
        </div>
      </div>
      <ChartContainer
        config={{ roi: { label: "ROI", color: "var(--chart-1)" } }}
        className="h-70 w-full"
      >
        <LineChart
          data={chartData}
          margin={{ left: 8, right: 12, top: 10, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="4 4" />
          <XAxis dataKey="index" tickLine={false} axisLine={false} />
          <YAxis
            dataKey="roi"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              const point = payload[0].payload as RoiPoint | undefined;
              if (!point) return null;

              const isGrowing = point.roiDiff >= 0;
              const RoiDiffIcon = isGrowing ? ArrowUpRight : ArrowDownRight;

              return (
                <div className="grid min-w-48 gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                  <div className="font-medium text-foreground">
                    {point.match}
                  </div>
                  <div className="flex items-center justify-between gap-3 text-muted-foreground">
                    <span>ROI</span>
                    <span className="font-mono font-medium text-foreground tabular-nums">
                      {point.roi}%
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      isGrowing ? "text-primary" : "text-destructive"
                    }`}
                  >
                    <RoiDiffIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {point.roiDiff > 0 ? "+" : ""}
                    {point.roiDiff}% vs previous ROI
                  </div>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="roi"
            stroke="var(--color-roi)"
            strokeWidth={2.5}
            dot={{ fill: "var(--color-roi)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </section>
  );
}
