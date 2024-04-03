import prisma from "../utils/prisma.js";

class EventController {
  async getEvents(req, res) {
    const events = await prisma.event.findMany();
    res.send(events);
  }

  async getEventsToBet(req, res) {
    const events = await prisma.event.findMany({
      where: {
        status: "NOT_STARTED",
        predictions: {
          none: {
            userId: {
              equals: parseInt(req.params.userId),
            },
          },
        },
      },
      include: {
        odd: true,
      },
    });
    res.send(events);
  }

  async getEventByIdWithOdds(req, res) {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        odd: true,
      },
    });
    res.json(event);
  }

  async getEventByIdWithPredictions(req, res) {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        predictions: true,
      },
    });
    res.json(event);
  }

  async createEvent(req, res) {
    try {
      await prisma.event.create({
        data: {
          id: parseInt(req.params.id),
          startDate: req.body.startDate,
          tournament: req.body.tournament,
          home: req.body.home,
          away: req.body.away,
          score: req.body.score,
          country: req.body.country,
          flagHome: req.body.flagHome,
          flagAway: req.body.flagAway,
        },
      });
      res.status(200).json("OK");
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  }
}

export const eventController = new EventController();
