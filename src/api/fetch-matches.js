import "dotenv/config";
import { prisma } from "../../lib/prisma.ts";

export const fetchMatches = async (id) => {
  try {
    return prisma.event.findMany({
      where: {
        status: "NOT_STARTED",
        predictions: { none: { userId: { equals: `${id}` } } },
      },
      include: { odd: true },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchMatchById = async (id) => {
  try {
    return prisma.event.findUnique({
      where: { id },
      include: { odd: true },
    });
  } catch (error) {
    console.log(error);
  }
};
