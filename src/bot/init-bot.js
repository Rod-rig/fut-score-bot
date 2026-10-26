import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

export const initBot = () => {
  const token = process.env.TELEGRAM_TOKEN;

  if (!token) {
    throw new Error("Missing required environment variable: TELEGRAM_TOKEN");
  }

  return new TelegramBot(token, { polling: true });
};
