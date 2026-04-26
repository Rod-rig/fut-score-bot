"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@l/prisma";

export const createPrediction = async (
  payload: Record<string, unknown>,
  userId: string,
) => {
  try {
    const data = Object.keys(payload).map((key) => ({
      value: payload[key] as string,
      userId,
      eventId: parseInt(key),
    }));
    await prisma.prediction.createMany({ data, skipDuplicates: true });
    revalidatePath(`/prediction/${userId}/create`);
    redirect(`/prediction/${userId}/create`);
  } catch (error) {
    console.log(error);
  }
};
