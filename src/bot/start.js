import "dotenv/config";
import { content } from "../content/index.js";

export const start = async (bot, message) => {
  const isAdmin = `${message.chat.id}` === process.env.MY_CHAT_ID;
  const userRole = isAdmin ? "ADMIN" : "USER";

  await bot.sendSticker(
    message.chat.id,
    content.stickers[Math.round(Math.random() * (content.stickers.length - 1))],
  );
  await bot.sendMessage(
    message.chat.id,
    content.hello(message.chat.first_name ?? "", userRole),
  );
};
