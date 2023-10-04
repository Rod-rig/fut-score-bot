import { oneXTwo, scoreMapping } from "../utils/score-mapping.js";
import { getResult } from "../utils/get-result.js";
import { tournamentsMap } from "../utils/tournaments-map.js";
import { round } from "../utils/round.js";

const updateUsersResult = async () => {
  const users = await fetchUsers();
  for (const user of users) {
    let results = {
      total: 0,
      england: 0,
      spain: 0,
      germany: 0,
      france: 0,
      italy: 0,
      international: 0,
      prevMatchday: 0,
      euroCups: 0,
    };
    for (const prediction of user["predictions"]) {
      results = calculateResult(results, prediction);
    }
    for (const res of Object.keys(results)) {
      const points = round(results[res]);
      if (res !== "prevMatchday" || res !== "total") {
        results.total += points;
      }
      results[res] = points;
    }
    results.total = round(results.total);
    await postUserResult(user.id, results);
    console.log(`✅ ${user.id} - ${results.total}`);
  }
};

const getResultType = (tournament) => tournamentsMap[tournament];

const calculateResult = (results, prediction) => {
  const expected = prediction.value;
  const actual = prediction["event"].score;
  const key = getResultType(prediction["event"]["tournament"]);

  if (!actual) {
    results[key] += 0;
    return results;
  }

  const [homeGoals, awayGoals] = actual.split(":");

  if (
    actual === expected ||
    (expected.toLowerCase() === "any other" && (homeGoals > 3 || awayGoals > 3))
  ) {
    results[key] += prediction["event"]["odd"][scoreMapping(actual)];
  } else if (getResult(actual) === getResult(expected)) {
    results[key] += prediction["event"]["odd"][oneXTwo(getResult(expected))];
  } else {
    results[key] += 0;
  }
  return results;
};

const fetchUsers = async () => {
  const response = await fetch(`http://localhost:3000/api/users-full-info`);
  return await response.json();
};

const postUserResult = async (id, results) => {
  try {
    await fetch(`http://localhost:3000/api/results/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        total: results.total,
        england: results.england,
        spain: results.spain,
        germany: results.germany,
        france: results.france,
        italy: results.italy,
        international: results.international,
        prevMatchday: results.prevMatchday,
        euroCups: results.euroCups,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

await updateUsersResult();
