import { content } from "../content/index.js";

export const start = async (bot, message) => {
  await bot.sendSticker(
    message.chat.id,
    content.stickers[Math.round(Math.random() * (content.stickers.length - 1))],
  );
  await bot.sendMessage(
    message.chat.id,
    content.hello(message.chat.first_name ?? ""),
  );
};
