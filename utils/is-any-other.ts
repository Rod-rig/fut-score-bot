export const isAnyOther = (score: string) =>
  score.toLowerCase() === "any other";

export const isAnyOtherScore = (score: string) => {
  if (!score || isAnyOther(score)) return;
  const [home, away] = score.split(":");
  return parseInt(home) > 3 || parseInt(away) > 3;
};
