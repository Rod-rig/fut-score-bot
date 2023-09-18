import { oneXTwo, scoreMapping } from "../utils/score-mapping.js";
import { getResult } from "../utils/get-result.js";

const updateUsersResult = async () => {
  const users = await fetchUsers();
  for (const user of users) {
    let result = 0;
    for (const prediction of user["predictions"]) {
      result += calculateResult(prediction);
    }
    await postUserResult(
      user.id,
      Math.round((result + Number.EPSILON) * 100) / 100
    );
    console.log(
      `✅ ${user.username} - ${
        Math.round((result + Number.EPSILON) * 100) / 100
      }`
    );
  }
};

const calculateResult = (prediction) => {
  const expected = prediction.value;
  const actual = prediction["event"].score;

  if (!actual) {
    return 0;
  }

  const [homeGoals, awayGoals] = actual.split(":");

  if (
    actual === expected ||
    (expected === "Any other" && (homeGoals > 3 || awayGoals > 3))
  ) {
    return prediction["event"]["odd"][scoreMapping(actual)];
  } else if (getResult(actual) === getResult(expected)) {
    return prediction["event"]["odd"][oneXTwo(getResult(expected))];
  } else {
    return 0;
  }
};

const fetchUsers = async () => {
  const response = await fetch(`http://localhost:3000/api/users-full-info`);
  return await response.json();
};

const postUserResult = async (id, result) => {
  try {
    await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        result: result,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

await updateUsersResult();
