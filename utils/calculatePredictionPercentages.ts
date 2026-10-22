type PredictionWithScore = {
  value?: string | null;
};

export const calculatePredictionPercentages = (
  predictions: PredictionWithScore[],
): {
  homeWinPercentage: number;
  drawPercentage: number;
  awayWinPercentage: number;
} => {
  if (!predictions.length) {
    return {
      homeWinPercentage: 0,
      drawPercentage: 0,
      awayWinPercentage: 0,
    };
  }

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  for (const prediction of predictions) {
    const value = prediction?.value?.trim();
    if (!value) continue;

    const normalizedValue = value.toLowerCase().replace(/\s+/g, "");
    if (normalizedValue === "Any Other") continue;

    const match = value.match(/^(\d+)\s*:\s*(\d+)$/);
    if (!match) continue;

    const homeGoals = Number(match[1]);
    const awayGoals = Number(match[2]);

    if (homeGoals > awayGoals) {
      homeWins += 1;
    } else if (homeGoals < awayGoals) {
      awayWins += 1;
    } else {
      draws += 1;
    }
  }

  const total = homeWins + draws + awayWins;

  if (total === 0) {
    return {
      homeWinPercentage: 0,
      drawPercentage: 0,
      awayWinPercentage: 0,
    };
  }

  return {
    homeWinPercentage: Number(((homeWins / total) * 100).toFixed(1)),
    drawPercentage: Number(((draws / total) * 100).toFixed(1)),
    awayWinPercentage: Number(((awayWins / total) * 100).toFixed(1)),
  };
};
