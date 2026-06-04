"use server";

import bcryptjs from "bcryptjs";
import { RegisterSchema, RegisterSchemaType } from "@s/register";
import { prisma } from "@l/prisma";
import { tgLog } from "@u/telegram-logger";

export const createUser = async (
  payload: RegisterSchemaType,
  id?: string | null,
) => {
  const validatedFields = RegisterSchema.safeParse(payload);

  if (!validatedFields.success) {
    await tgLog(
      `❌ *Registration failed*\nReason: Invalid fields\nEmail: ${validatedFields?.data?.email}\nName: ${validatedFields?.data?.name}\nTime: ${new Date().toLocaleString()}`,
    );
    return false;
  }

  const { name, email, password } = validatedFields.data;
  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      await tgLog(
        `❌ *Registration failed*\nReason: User is already exists\nEmail: ${email}\nName: ${name}\nTime: ${new Date().toLocaleString()}`,
      );
      return false;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const min = 100000000;
    const max = 999999999;
    const telegramId = id
      ? id.toString()
      : Math.floor(Math.random() * (max - min + 1) + min).toString();
    await prisma.user.create({
      data: {
        firstName: name,
        username: name,
        email,
        hashedPassword,
        telegramId,
        results: {
          create: {},
        },
      },
    });
    await tgLog(
      `✅ *New user registration success*\n\nTG ID: ${telegramId}\nName: ${name}\nEmail: ${email}\n\nTime: ${new Date().toLocaleString()}`,
    );
    return true;
  } catch (error) {
    return false;
  }
};
