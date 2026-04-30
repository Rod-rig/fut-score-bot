export const calculateAverageScore = (predictions: (string | null | undefined)[]) => {
  let totalHome = 0;
  let totalAway = 0;
  let count = 0;

  for (const pred of predictions) {
    const str = typeof pred === "string" ? pred.trim() : "";
    if (!str || str.toLowerCase() === "any other") continue;

    const match = str.match(/^(\d+):(\d+)$/);
    if (!match) continue;

    const home = parseInt(match[1], 10);
    const away = parseInt(match[2], 10);

    if (home >= 0 && away >= 0) {
      totalHome += home;
      totalAway += away;
      count++;
    }
  }

  if (count === 0) {
    return { home: 0, away: 0 };
  }

  const avgHome = Number((totalHome / count).toFixed(1));
  const avgAway = Number((totalAway / count).toFixed(1));

  return { home: avgHome, away: avgAway };
}
