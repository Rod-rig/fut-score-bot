import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PredictionController {
  async getPredictions(req, res) {
    const predictions = await prisma.prediction.findMany();
    res.send(predictions);
  }

  async createPrediction(req, res) {
    await prisma.prediction.create({
      data: {
        value: req.body.value,
        userId: req.body.userId,
        eventId: req.body.eventId,
      },
    });
    res.status(200);
    res.send("OK");
  }

  async updatePrediction(req, res) {
    await prisma.prediction.update({
      where: {
        userId_eventId: {
          userId: req.body.userId,
          eventId: req.body.eventId,
        },
      },
      data: {
        value: req.body.value,
      },
    });
    res.status(200);
    res.send("OK");
  }
}

export const predictionController = new PredictionController();
