export const getResult = (score) => {
  const [homeGoals, awayGoals] = score.split(":");

  if (homeGoals > awayGoals) {
    return "1";
  } else if (homeGoals < awayGoals) {
    return "2";
  } else {
    return "X";
  }
};
