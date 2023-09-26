import "dotenv/config";
import { fetchMatchById } from "./fetch-matches.js";

export const createPrediction = async (value, userId, eventId) => {
  try {
    let prediction = await getPrediction(value, userId, eventId);
    const event = await fetchMatchById(eventId);
    if (event.status === "FINISHED") return;
    if (prediction) {
      await updatePrediction(value, userId, eventId);
    } else {
      await createNewPrediction(value, userId, eventId);
      prediction = await getPrediction(value, userId, eventId);
    }
    return prediction;
  } catch (error) {
    console.log(error);
  }
};

const getPrediction = async (value, userId, eventId) => {
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
