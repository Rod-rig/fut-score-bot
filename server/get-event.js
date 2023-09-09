import "dotenv/config";
const id = 39491213;

const transformData = (info, odds) => {
  const marketName1X2 = "1 X 2";
  const marketNameCS = "Correct Score";
  const type1X2 = "1X2";
  const outcomes = "outcomes";
  const outcomeName = "outcome_name";
  const outcomeShortName = "outcome_short_name";
  const outcomeCoef = "outcome_coef";
  const score = "score";
  const eventDate = "event_dt";
  const categoryName = "category_name";
  const tournamentName = "tournament_name";
  const oneXTwo = odds.result.find((r) => r.market_name === marketName1X2);
  const CS = odds.result.find((r) => r.market_name === marketNameCS);
  CS[outcomes][0][outcomeName] = "Any other";
  CS[outcomes].push(CS[outcomes].shift());

  const date = new Date(info.result[0][eventDate] * 1000);
  return {
    id: id,
    date: date.toLocaleDateString(),
    start_at: `${date.getHours()}:${date.getMinutes()}`,
    tournament: info.result[0][tournamentName],
    home: oneXTwo[outcomes][0][outcomeName],
    away: oneXTwo[outcomes][2][outcomeName],
    country: info.result[0][categoryName],
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    odds: [
      {
        type: type1X2,
        coef: oneXTwo[outcomes].map((o) => ({
          name: o[outcomeShortName],
          value: o[outcomeCoef],
        })),
      },
      {
        type: score,
        coef: CS[outcomes].map((o) => ({
          name: o[outcomeShortName],
          value: o[outcomeCoef],
        })),
      },
    ],
  };
};

const getEventInfo = () =>
  fetch(`${process.env.API_URL}/frontend_api2/`, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 173,
      method: "frontend/event/get",
      params: {
        by: {
          lang: "en",
          head_markets: false,
          service_id: 0,
          event_id: id,
        },
      },
    }),
  }).then((res) => res.json());

const getEventOdds = () =>
  fetch(`${process.env.API_URL}/frontend_api2/`, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 6,
      method: "frontend/market/get",
      params: {
        by: {
          lang: "en",
          service_id: 0,
          event_id: id,
        },
      },
    }),
  }).then((res) => res.json());

Promise.all([getEventInfo(), getEventOdds()]).then(([info, odds]) =>
  console.log(JSON.stringify(transformData(info, odds)))
);
