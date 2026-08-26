import "dotenv/config";
import prisma from "../utils/prisma.js";
import { notifyMe } from "./notify-me.js";

export const setEventScore = async (bot, message, chatId) => {
  try {
    const isAdmin = `${chatId}` === process.env.MY_CHAT_ID;

    if (!isAdmin) {
      await bot.sendMessage(
        chatId,
        "❌ You don't have permission to use this command. Only admins can set event scores.",
      );
      return;
    }

    const parts = message.text.split(" ");
    if (parts.length < 3) {
      await bot.sendMessage(
        chatId,
        "❌ Invalid command format.\nUsage: /set_event_score <event_id> <score>\n\nExample: /set_event_score 12345 2:1",
      );
      return;
    }

    const eventId = parseInt(parts[1], 10);
    const score = parts[2];

    if (isNaN(eventId)) {
      await bot.sendMessage(
        chatId,
        "❌ Invalid event ID. Please provide a valid number.",
      );
      return;
    }

    if (!score.includes(":")) {
      await bot.sendMessage(
        chatId,
        "❌ Invalid score format.\nScore must be in format: X:Y (e.g., 2:1, 0:0, 3:2)",
      );
      return;
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      await bot.sendMessage(
        chatId,
        `❌ Event with ID ${eventId} not found.`,
      );
      return;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { score: score },
    });

    const message_text = `✅ Event score has been set!\n\n📋 Event Details:\n${updatedEvent.home} vs ${updatedEvent.away}\n🏛 ${updatedEvent.tournament}\n📊 Score: ${updatedEvent.score}`;

    await bot.sendMessage(chatId, message_text);

    await notifyMe(
      bot,
      `🔧 Admin (${chatId}) set score for event ${eventId}: ${score}`,
    );
  } catch (error) {
    console.error("Error in setEventScore:", error);
    await bot.sendMessage(
      chatId,
      "❌ An error occurred while setting event score. Please try again.",
    );
  }
};

