import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!process.env.LOGS_TELEGRAM_TOKEN || !process.env.MY_CHAT_ID) {
      console.error("Missing Telegram env vars");
      return NextResponse.json({ success: false }, { status: 500 });
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

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram log error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
