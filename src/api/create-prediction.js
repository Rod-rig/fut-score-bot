import "dotenv/config";
import { fetchMatchById } from "./fetch-matches.js";

export const createPrediction = async (value, userId, eventId) => {
  try {
    let prediction = await getPrediction(userId, eventId);
    const event = await fetchMatchById(eventId);
    if (event.status === "FINISHED") return;
    await updateAveragePrediction(value, eventId);
    if (prediction) {
      await updatePrediction(value, userId, eventId);
    } else {
      await createNewPrediction(value, userId, eventId);
      prediction = await getPrediction(userId, eventId);
    }
    return prediction;
  } catch (error) {
    console.log(error);
  }
};

const getPrediction = async (userId, eventId) => {
  try {
    const response = await fetch(
      `${process.env.ROOT_URL}/api/prediction-by-id`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          userId,
          eventId,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createNewPrediction = async (value, userId, eventId) => {
  try {
    await fetch(`${process.env.ROOT_URL}/api/prediction`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value,
        userId,
        eventId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePrediction = async (value, userId, eventId) => {
  try {
    await fetch(`${process.env.ROOT_URL}/api/prediction`, {
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value,
        userId,
        eventId,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

const calculateAverageScore = (scores) => {
  const sum = scores.reduce(
    (acc, curr) => {
      const [home, away] = curr.split(":");
      return {
        home: acc["home"] + parseInt(home),
        away: acc["away"] + parseInt(away),
      };
    },
    {
      home: 0,
      away: 0,
    }
  );
  const homeAverage = Math.round(sum["home"] / scores.length);
  const awayAverage = Math.round(sum["away"] / scores.length);
  return `${homeAverage}:${awayAverage}`;
};

const getEventWithPredictions = async (eventId) => {
  try {
    const response = await fetch(
      `${process.env.ROOT_URL}/api/event-predictions/${eventId}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateAveragePrediction = async (value, eventId) => {
  try {
    const userId = 100000002;
    const prediction = await getPrediction(userId, eventId);
    if (prediction) {
      const event = getEventWithPredictions(eventId);
      const eventScores = event.predictions
        .filter((p) => p.userId !== userId || p.value !== "Any Other")
        .map((p) => p.value);
      const scores = [...eventScores, value];
      const newValue = calculateAverageScore(scores);
      await updatePrediction(newValue, userId, eventId);
    } else {
      await createNewPrediction(value, userId, eventId);
    }
  } catch (error) {
    console.log(error);
  }
};
