"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@l/prisma";
import { tgLog } from "@u/telegram-logger";

export const createPrediction = async (
  payload: Record<string, unknown>,
  userId: string,
) => {
  try {
    const data = Object.keys(payload).map((key) => ({
      value: payload[key] as string,
      userId,
      eventId: Number(key),
    }));
    await prisma.prediction.createMany({ data, skipDuplicates: true });
    const dataToLog = data.map((item) => `${item.eventId} - ${item.value}`).join('\n');
    await tgLog(
      `✅ *Predictions made successfully*\nUser ID: ${userId}\n\nPredictions payload:\n${dataToLog}\n\nTime: ${new Date().toLocaleString()}`,
    );
  } catch (error) {
    await tgLog(
      `❌ *Couldn't make prediction*\nReason: ${JSON.stringify(error)}\nTime: ${new Date().toLocaleString()}`,
    );
    console.log(error);
  }

  revalidatePath(`/create-predictions`);
  // redirect(`/create-predictions`);
};
