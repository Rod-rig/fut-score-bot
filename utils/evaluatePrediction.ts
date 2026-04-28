export const evaluatePrediction = (prediction: any) => {
  const predictedScore = prediction.value;
  const actualScore = prediction.event?.score;
  const odds = prediction.event?.odd;

  if (!predictedScore || !actualScore || !odds) {
    return {
      points: 0,
      status: "Incorrect",
    };
  }

  const [predHome, predAway] = predictedScore.split(":").map(Number);
  const [actualHome, actualAway] = actualScore.split(":").map(Number);

  const getMatchResult = (home: any, away: any) => {
    if (home > away) return "one";
    if (home < away) return "two";
    return "x";
  };

  const getExactScoreKey = (home: any, away: any) => {
    const numberMap = ["zero", "one", "two", "three"];

    if (home <= 3 && away <= 3) {
      return `${numberMap[home]}${numberMap[away][0].toUpperCase()}${numberMap[away].slice(1)}`;
    }

    return "anyOther";
  };

  if (predHome === actualHome && predAway === actualAway) {
    const exactKey = getExactScoreKey(predHome, predAway);

    return {
      points: odds[exactKey] ?? 0,
      status: "Correct",
    };
  }

  const predictedResult = getMatchResult(predHome, predAway);
  const actualResult = getMatchResult(actualHome, actualAway);

  if (predictedResult === actualResult) {
    return {
      points: odds[predictedResult] ?? 0,
      status: "Partial",
    };
  }

  return {
    points: 0,
    status: "Incorrect",
  };
}
