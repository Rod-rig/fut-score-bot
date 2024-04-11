import { getResult } from "../utils/get-result.js";

const createStatus = (prediction) => {
  if (!prediction.event.score) {
    return "⌛️";
  }

  const [homeGoals, awayGoals] = prediction.event.score.split(":");

  if (
    prediction.event.score === prediction.value ||
    (prediction.value.toLowerCase() === "any other" &&
      (homeGoals > 3 || awayGoals > 3))
  ) {
    return "✅";
  }

  if (prediction.value.toLowerCase() === "any other") {
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
  if (!predictions.length) {
    return "🤷‍♂️ You don't have any predictions yet\n\n⭐️ To start betting on the new events press /bet";
  }
  return predictions
    .slice(-50)
    .map(
      (p) =>
        `${createStatus(p)} ${p.event.home} ${
          p.event.score ? p.event.score : "-"
        } ${p.event.away} (your bet - ${p.value})`,
    )
    .join("\n\n");
};
