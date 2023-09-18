import { stringToEmoji } from "../utils/string-to-emoji.js";

const eventIds = [39797179, 39511477];

const createEvent = async (data) => {
  try {
    await fetch(`http://localhost:3000/api/event/${data["event_id"]}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: data["event_id"],
        startDate: new Date(data["event_dt"] * 1000),
        tournament: data["tournament_name"],
        home: data["participants"][0]["participant_name"],
        away: data["participants"][1]["participant_name"],
        score: null,
        country: data["category_name"],
        flagHome: stringToEmoji(data["category_name"].toLowerCase()),
        flagAway: stringToEmoji(data["category_name"].toLowerCase()),
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchEvent = async (id) => {
  const response = await fetch("https://www.favbet.ua/frontend_api2", {
    method: "post",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 5,
      method: "frontend/event/get",
      params: {
        by: {
          lang: "en",
          head_markets: true,
          service_id: 0,
          event_id: id,
        },
      },
    }),
  });
  return await response.json();
};

const createOdds = async (data) => {
  try {
    const oneXTwo = data.find((d) => d["market_name"] === "1 X 2");
    const correctScore = data.find((d) => d["market_name"] === "Correct Score");
    await fetch(`http://localhost:3000/api/odd/${oneXTwo["event_id"]}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        one: oneXTwo["outcomes"][0]["outcome_coef"],
        x: oneXTwo["outcomes"][1]["outcome_coef"],
        two: oneXTwo["outcomes"][2]["outcome_coef"],
        zeroZero: correctScore["outcomes"][1]["outcome_coef"],
        oneOne: correctScore["outcomes"][2]["outcome_coef"],
        twoTwo: correctScore["outcomes"][3]["outcome_coef"],
        oneZero: correctScore["outcomes"][4]["outcome_coef"],
        twoZero: correctScore["outcomes"][5]["outcome_coef"],
        threeZero: correctScore["outcomes"][6]["outcome_coef"],
        twoOne: correctScore["outcomes"][7]["outcome_coef"],
        threeOne: correctScore["outcomes"][8]["outcome_coef"],
        threeTwo: correctScore["outcomes"][9]["outcome_coef"],
        zeroOne: correctScore["outcomes"][10]["outcome_coef"],
        zeroTwo: correctScore["outcomes"][11]["outcome_coef"],
        zeroThree: correctScore["outcomes"][12]["outcome_coef"],
        oneTwo: correctScore["outcomes"][13]["outcome_coef"],
        oneThree: correctScore["outcomes"][14]["outcome_coef"],
        twoThree: correctScore["outcomes"][15]["outcome_coef"],
        anyOther: correctScore["outcomes"][0]["outcome_coef"],
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchOdds = async (id) => {
  const response = await fetch("https://www.favbet.ua/frontend_api2", {
    method: "post",
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
  });
  return await response.json();
};

const createEvents = async () => {
  for (const id of eventIds) {
    // create event
    const event = await fetchEvent(id);
    await createEvent(event.result[0]);

    // create odds
    const odds = await fetchOdds(id);
    await createOdds(odds.result);

    console.log(`✅ ${id}`);
  }
};

await createEvents();
