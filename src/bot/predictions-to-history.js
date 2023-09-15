const getResult = (score) => {
  const [homeGoals, awayGoals] = score.split(":");

  if (homeGoals > awayGoals) {
    return "1";
  } else if (homeGoals < awayGoals) {
    return "2";
  } else {
    return "X";
  }
};

const createStatus = (prediction) => {
  if (!prediction.event.score) {
    return "⌛️";
  }

  const [homeGoals, awayGoals] = prediction.event.score.split(":");

  if (
    prediction.event.score === prediction.value ||
    (prediction.value === "Any other" && (homeGoals > 3 || awayGoals > 3))
  ) {
    return "✅";
  }

  if (prediction.value === "Any other") {
    return "❌";
  }

  const actual = getResult(prediction.event.score);
  const expected = getResult(prediction.value);

  if (actual === expected) {
    return "⚠️";
  }

  return "❌";
};

export const predictionsToHistory = (predictions) => {
  return predictions
    .map(
      (p) =>
        `${createStatus(p)} ${p.event.home} ${
          p.event.score ? p.event.score : "-"
        } ${p.event.away} (your bet - ${p.value})`
    )
    .join("\n\n");
};
