import "dotenv/config";
import { notifyMe } from "../bot/notify-me.js";
import { content } from "../content/index.js";
import prisma from "../utils/prisma.js";

export const auth = async (bot, chat) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: `${chat.id}` } });
    if (!user) {
      await prisma.user.create({
        data: {
          id: `${chat.id}`,
          username: chat.username ?? "",
          firstName: chat.first_name ?? "",
          lastName: chat.last_name ?? "",
        },
      });
      await prisma.results.create({ data: { userId: `${chat.id}` } });
      await notifyMe(bot, `🥳 ${content.new_user} ${JSON.stringify(chat)}`);
    }
  } catch (error) {
    console.log(error);
  }
};
