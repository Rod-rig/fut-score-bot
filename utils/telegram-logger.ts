export const tgLog = async (message: string) => {
  try {
    if (typeof window === "undefined") {
      if (!process.env.LOGS_TELEGRAM_TOKEN || !process.env.MY_CHAT_ID) {
        console.error("Missing Telegram env vars");
        return false;
      }

      const telegramUrl = `https://api.telegram.org/bot${process.env.LOGS_TELEGRAM_TOKEN}/sendMessage`;

      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.MY_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      return response.ok;
    }

    // На клієнті використовуємо API маршрут
    const response = await fetch("/api/telegram-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send telegram log:", error);
    return false;
  }
};
