export const showPrettyMatch = (match) => {
  const flagHome = match.flagHome;
  const flagAway = match.flagAway;
  const home = match.home;
  const away = match.away;
  return `${flagHome} ${home} - ${away} ${flagAway}`;
};
