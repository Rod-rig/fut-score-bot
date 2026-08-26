import "dotenv/config";
import prisma from "../utils/prisma.js";
import { notifyMe } from "./notify-me.js";

export const toggleEventStatus = async (bot, message, chatId) => {
  try {
    const isAdmin = `${chatId}` === process.env.MY_CHAT_ID;

    if (!isAdmin) {
      await bot.sendMessage(
        chatId,
        "❌ You don't have permission to use this command. Only admins can toggle event status.",
      );
      return;
    }

    // Parse event ID from message
    const parts = message.text.split(" ");
    if (parts.length < 2) {
      await bot.sendMessage(
        chatId,
        "❌ Invalid command format.\nUsage: /toggle_event_status <event_id>\n\nExample: /toggle_event_status 12345",
      );
      return;
    }

    const eventId = parseInt(parts[1], 10);

    if (isNaN(eventId)) {
      await bot.sendMessage(
        chatId,
        "❌ Invalid event ID. Please provide a valid number.",
      );
      return;
    }

    // Find the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      await bot.sendMessage(chatId, `❌ Event with ID ${eventId} not found.`);
      return;
    }

    // Toggle status
    const newStatus = event.status === "FINISHED" ? "NOT_STARTED" : "FINISHED";

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { status: newStatus },
    });

    // Send success message
    const statusEmoji = newStatus === "FINISHED" ? "✅" : "🔄";
    const message_text = `${statusEmoji} Event ID ${eventId} status has been toggled.\n\n📋 Event Details:\n${updatedEvent.home} vs ${updatedEvent.away}\n🏛 ${updatedEvent.tournament}\n📊 New Status: ${newStatus}`;

    await bot.sendMessage(chatId, message_text);

    // Notify admins
    await notifyMe(
      bot,
      `🔧 Admin (${chatId}) toggled event ${eventId} status to ${newStatus}`,
    );
  } catch (error) {
    console.error("Error in toggleEventStatus:", error);
    await bot.sendMessage(
      chatId,
      "❌ An error occurred while toggling event status. Please try again.",
    );
  }
};
