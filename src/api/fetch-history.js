import "dotenv/config";
import prisma from "../utils/prisma.js";

export const fetchHistory = async (userId) => {
  try {
    return prisma.prediction.findMany({
      where: { userId: `${userId}` },
      include: { event: true },
      orderBy: { event: { startDate: "asc" } },
    });
  } catch (error) {
    console.log(error);
  }
};
