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
}

export const eventController = new EventController();
