import "dotenv/config";
import { auth } from "../api/auth.js";
import { createPrediction } from "../api/create-prediction.js";
import { content } from "../content/index.js";
import { fetchMatchById, fetchMatches } from "../api/fetch-matches.js";
import { fetchResults } from "../api/fetch-results.js";
import { initBot } from "./init-bot.js";
import { notifyMe } from "./notify-me.js";
import { start } from "./start.js";
import { matchesToButtons } from "./matches-to-buttons.js";
import { prefixes } from "./prefixes.js";
import { showPrettyMatch } from "./show-pretty-match.js";
import { scoresToButtons } from "./scores-to-buttons.js";
import { fetchHistory } from "../api/fetch-history.js";
import { predictionsToHistory } from "./predictions-to-history.js";
import { totalResultsButtons } from "./total-results-buttons.js";

const bot = initBot();

export const startBot = () => {
  bot.on("message", async (message) => {
    const id = message.chat.id;
    await auth(bot, message.chat);
    if (message.text === "/start") {
      await start(bot, message);
      await notifyMe(bot, `✅ Start to bet: ${JSON.stringify(message.chat)}`);
    } else if (message.text === "/bet") {
      const matches = await fetchMatches(id);
      if (!matches || matches.length < 1) {
        await bot.sendMessage(id, content.tech_works);
      } else {
        await bot.sendMessage(id, content.bet, matchesToButtons(matches));
      }
    } else if (message.text === "/total_results") {
      const results = await fetchResults(id);
      await bot.sendMessage(id, results, {
        ...totalResultsButtons,
        parse_mode: "HTML",
      });
      await notifyMe(bot, `✅ Seen results: ${message.chat.first_name}`);
    } else if (message.text === "/history") {
      const predictions = await fetchHistory(id);
      const str = predictionsToHistory(predictions);
      try {
        await bot.sendMessage(id, `${content.history}${str}`);
        await notifyMe(bot, `✅ Seen history: ${message.chat.first_name}`);
      } catch (e) {
        console.log(e);
      }
    } else {
      await notifyMe(bot, JSON.stringify(message));
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
      const matchId = prediction.split("_")[0];
      const value = prediction.split("_")[1];
      const match = await createPrediction(value, chatId, matchId);
      await bot.sendMessage(
        chatId,
        `${content.success} ${showPrettyMatch(match.event)}`
      );
      await notifyMe(
        bot,
        `✅ Placed bet: ${message.message.chat.first_name} ${showPrettyMatch(
          match.event
        )} ${value}`
      );
      const matches = await fetchMatches(chatId);
      if (matches && matches.length >= 1) {
        await bot.sendMessage(chatId, content.bet, matchesToButtons(matches));
      }
    } else if (message.data.includes(prefixes.match)) {
      const matchId = message.data.split("_")[1];
      const match = await fetchMatchById(matchId);
      await bot.sendMessage(
        chatId,
        content.odds(showPrettyMatch(match)),
        scoresToButtons(match)
      );
    } else if (message.data.includes(prefixes.results)) {
      const key = message.data.split("_")[1];
      const results = await fetchResults(chatId, key);
      await bot.sendMessage(chatId, results, {
        ...totalResultsButtons,
        parse_mode: "HTML",
      });
      await notifyMe(
        bot,
        `✅ Seen results for ${key}: ${message.message.chat.first_name}`
      );
    }
  });

  bot.on("polling_error", (error) => console.log(error.code));
  bot.on("error", (error) => console.log(error.code));
};
