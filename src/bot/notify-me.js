import "dotenv/config";

export const notifyMe = async (bot, message) => {
  await bot.sendMessage(process.env.MY_CHAT_ID, message);
};
