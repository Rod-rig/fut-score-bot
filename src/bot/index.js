import "dotenv/config";
import { auth } from "../api/auth.js";
import { createPrediction } from "../api/create-prediction.js";
import { content } from "../content/index.js";
import { fetchMatches } from "../api/fetch-matches.js";
import { fetchResults } from "../api/fetch-results.js";
import { initBot } from "./init-bot.js";
import { notifyMe } from "./notify-me.js";
import { start } from "./start.js";
import { matchesToButtons } from "./matches-to-buttons.js";
import { prefixes } from "./prefixes.js";
import {showPrettyMatch} from "./show-pretty-match.js";

const bot = initBot();

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

export const startBot = () => {
  bot.on("message", async (message) => {
    const id = message.chat.id;
    await auth(bot, message.chat);
    if (message.text === "/start") {
      await start(bot, message);
      await notifyMe(bot, `✅ Start to bet: ${JSON.stringify(message.chat)}`);
    } else if (message.text === "/bet") {
      await bot.sendMessage(id, content.tech_works);
    } else if (message.text === "/qwe") {
      const matches = await fetchMatches();
      await bot.sendMessage(id, content.bet, matchesToButtons(matches));
    } else if (message.text === "/total_results") {
      const results = await fetchResults(id);
      await bot.sendMessage(id, results, {
        parse_mode: "HTML",
      });
    } else {
      await bot.sendMessage(id, content.error);
    }
  });

  bot.on("callback_query", async (message) => {
    const chatId = message.message.chat.id;
    try {
      await bot.deleteMessage(chatId, message.message.message_id);
    } catch (e) {
      console.log(e);
    }
    if (message.data.includes(prefixes.score)) {
      const prediction = message.data.split(`${prefixes.score}_`)[1];
      const id = prediction.split("_")[0];
      await createPrediction(chatId, prediction);
      const matches = await fetchMatches();
      const match = matches.find((m) => m.id.toString() === id);
      await bot.sendMessage(
        chatId,
        `${content.success} ${showPrettyMatch(match)}`
      );
    } else if (message.data.includes(prefixes.match)) {
      const matches = await fetchMatches();
      const match = matches[message.data.split("_")[1]];
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
