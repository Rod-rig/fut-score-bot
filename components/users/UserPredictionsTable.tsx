"use client";

import Link from "next/link";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { Button } from "@c/ui/button";
import { Badge } from "@c/ui/badge";
import { evaluatePrediction } from "@u/evaluatePrediction";

type UserWithPredictions = Prisma.UserGetPayload<{
  include: {
    predictions: { include: { event: { include: { odd: true } } } };
    results: true;
  };
}>;

type UserPredictionsTableProps = {
  predictions: UserWithPredictions["predictions"];
  count: number;
};

export default function UserPredictionsTable({
  predictions,
  count,
}: UserPredictionsTableProps) {
  const take = 10;
  const [predictionPage, setPredictionPage] = useState(1);
  const totalPredictionPages = Math.max(1, Math.ceil(count / take));
  const safePredictionPage = Math.min(predictionPage, totalPredictionPages);
  const visiblePredictions = predictions.slice(
    (safePredictionPage - 1) * take,
    safePredictionPage * take,
  );

  return (
    <div className="rounded-xl border border-border/40 bg-card/50 overflow-hidden">
      <div className="p-6 border-b border-border/40">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Predictions
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
            {visiblePredictions.map((pred, index) => {
              const { points, status } = evaluatePrediction(pred, pred.event);
              const isCorrect = status === "Correct";
              const isInCorrect = status === "Incorrect";

              return (
                <tr
                  key={`${pred.event.id}-${index}`}
                  className="hover:bg-primary/5"
                >
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
      <div className="flex items-center justify-between border-t border-border/40 px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Showing {(safePredictionPage - 1) * take + 1}-
          {Math.min(safePredictionPage * take, count)} of {count} predictions
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePredictionPage === 1}
            onClick={() => setPredictionPage((page) => Math.max(1, page - 1))}
            className="bg-transparent text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            Previous
          </Button>
          <span className="px-2 text-sm text-muted-foreground">
            {safePredictionPage} / {totalPredictionPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={safePredictionPage === totalPredictionPages}
            onClick={() =>
              setPredictionPage((page) =>
                Math.min(totalPredictionPages, page + 1),
              )
            }
            className="bg-transparent text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
