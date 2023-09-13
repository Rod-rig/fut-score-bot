import TelegramBot from "node-telegram-bot-api";
import { auth } from "../server/auth.js";
import { createPrediction } from "../server/create-prediction.js";
import { content } from "../content/index.js";
import "dotenv/config";
import { fetchMatches } from "../server/fetch-matches.js";
import { fetchResults } from "../server/fetch-results.js";

const bot = new TelegramBot(
  process.env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN",
  { polling: true }
);

const prefixes = {
  match: "MATCH",
  score: "SCORE",
};

const showPrettyMatch = (match) => {
  const flagHome = match.flagHome;
  const flagAway = match.flagAway;
  const home = match.home;
  const away = match.away;
  return `${flagHome} ${home} - ${away} ${flagAway}`;
};

const scoresToButtons = (match) => {
  const arr = [];
  for (let i = 0; i < match.odds[1].coef.length; i += 2) {
    const o = match.odds[1].coef[i];
    const p = match.odds[1].coef[i + 1];
    arr.push([
      {
        text: `${o.name} - ${o.value}`,
        callback_data: `${prefixes.score}_${match.id}_${o.name}`,
      },
      {
        text: `${p.name} - ${p.value}`,
        callback_data: `${prefixes.score}_${match.id}_${p.name}`,
      },
    ]);
  }
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: arr,
    }),
  };
};

const matchesToButtons = (events) => {
  const arr = [];
  events.forEach((e, index) => {
    arr.push([
      {
        text: showPrettyMatch(e),
        callback_data: `${prefixes.match}_${index}`,
      },
    ]);
  });
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: arr,
    }),
  };
};

export const startBot = () => {
  bot.on("message", async (msg) => {
    await auth(msg.chat);
    if (msg.text === "/start") {
      await bot.sendSticker(
        msg.chat.id,
        content.stickers[
          Math.round(Math.random() * (content.stickers.length - 1))
        ]
      );
      await bot.sendMessage(
        msg.chat.id,
        content.hello(msg.chat.first_name ?? "")
      );
      await bot.sendMessage(
        process.env.MY_CHAT_ID,
        `✅ ${JSON.stringify(msg.chat)}`
      );
      } else if (msg.text === "/bet") {
        await bot.sendMessage(msg.chat.id, content.tech_works);
    // } else if (msg.text === "/bet") {
    //   const matches = await fetchMatches();
    //   await bot.sendMessage(
    //     msg.chat.id,
    //     content.bet,
    //     matchesToButtons(matches)
    //   );
    } else if (msg.text === "/total_results") {
      const results = await fetchResults(msg.chat.id);
      await bot.sendMessage(msg.chat.id, results, {
        parse_mode: "HTML",
      });
    } else {
      await bot.sendMessage(msg.chat.id, content.error);
    }
  });

  bot.on("callback_query", async (msg) => {
    const chatId = msg.message.chat.id;
    try {
      await bot.deleteMessage(chatId, msg.message.message_id);
    } catch (e) {
      console.log(e);
    }
    if (msg.data.includes(prefixes.score)) {
      const prediction = msg.data.split(`${prefixes.score}_`)[1];
      const id = prediction.split("_")[0];
      await createPrediction(chatId, prediction);
      const matches = await fetchMatches();
      const match = matches.find((m) => m.id.toString() === id);
      await bot.sendMessage(
        chatId,
        `${content.success} ${showPrettyMatch(match)}`
      );
    } else if (msg.data.includes(prefixes.match)) {
      const matches = await fetchMatches();
      const match = matches[msg.data.split("_")[1]];
      await bot.sendMessage(
        chatId,
        content.odds(showPrettyMatch(match)),
        scoresToButtons(match)
      );
    }
  });

  bot.on("polling_error", (error) => console.log(error.code));
  bot.on("error", (error) => console.log(error.code));
};
