import "dotenv/config";
import { fetchMatchById } from "./fetch-matches.js";
import prisma from "../utils/prisma.js";

export const createPrediction = async (value, userId, eventId) => {
  try {
    let prediction = await getPrediction(userId, eventId);
    const event = await fetchMatchById(eventId);
    if (event.status === "FINISHED") return;
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
    return prisma.prediction.findUnique({
      where: {
        userId_eventId: {
          userId: `${userId}`,
          eventId: parseInt(eventId),
        },
      },
      include: {
        event: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewPrediction = async (value, userId, eventId) => {
  try {
    await prisma.prediction.create({
      data: {
        value,
        userId: `${userId}`,
        eventId: parseInt(eventId),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePrediction = async (value, userId, eventId) => {
  try {
    await prisma.prediction.update({
      where: {
        userId_eventId: {
          userId: `${userId}`,
          eventId: parseInt(eventId),
        },
      },
      data: {
        value,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
