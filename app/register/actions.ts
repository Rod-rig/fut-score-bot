"use server";

import bcryptjs from "bcryptjs";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schemas/register";
import { prisma } from "@/lib/client";

export const createUser = async (payload: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(payload);

  if (!validatedFields.success) {
    console.log(validatedFields);
    return;
  }

  const { name, email, password } = validatedFields.data;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const min = 100000000;
    const max = 999999999;
    const id = Math.floor(Math.random() * (max - min + 1) + min).toString();
    await prisma.user.create({
      data: {
        id,
        firstName: name,
        username: name,
        email,
        hashedPassword,
        telegramId: id,
      },
    });
  } catch (error) {
    return { error: "Database error occurred" };
  }
};
