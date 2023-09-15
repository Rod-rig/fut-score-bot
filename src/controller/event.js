import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class EventController {
  async getEvents(req, res) {
    const events = await prisma.event.findMany();
    res.send(events);
  }

  async getEventsToBet(req, res) {
    const events = await prisma.event.findMany({
      where: {
        status: "NOT_STARTED",
      },
      include: {
        odd: true,
      },
    });
    res.send(events);
  }

  async getEventById(req, res) {
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
}

export const eventController = new EventController();
