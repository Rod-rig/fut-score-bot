import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

export const initBot = () => {
  return new TelegramBot(
    process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN",
    { polling: true }
  );
};
