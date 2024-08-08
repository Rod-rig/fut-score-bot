import prisma from "../utils/prisma.js";

class PredictionController {
  async getPredictions(req, res) {
    const predictions = await prisma.prediction.findMany();
    res.json(predictions);
  }

  async getPredictionHistory(req, res) {
    const predictions = await prisma.prediction.findMany({
      where: {
        userId: req.params.id,
      },
      include: {
        event: true,
      },
      orderBy: {
        event: {
          startDate: "asc",
        },
      },
    });
    res.json(predictions);
  }

  async getPredictionById(req, res) {
    try {
      const prediction = await prisma.prediction.findUnique({
        where: {
          userId_eventId: {
            userId: parseInt(req.body.userId),
            eventId: parseInt(req.body.eventId),
          },
        },
        include: {
          event: true,
        },
      });
      res.json(prediction);
    } catch (error) {
      res.status(404).json(null);
    }
  }

  async createPrediction(req, res) {
    try {
      await prisma.prediction.create({
        data: {
          value: req.body.value,
          userId: parseInt(req.body.userId),
          eventId: parseInt(req.body.eventId),
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(null);
    }
  }

  async updatePrediction(req, res) {
    try {
      await prisma.prediction.update({
        where: {
          userId_eventId: {
            userId: parseInt(req.body.userId),
            eventId: parseInt(req.body.eventId),
          },
        },
        data: {
          value: req.body.value,
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(null);
    }
  }
}

export const predictionController = new PredictionController();
