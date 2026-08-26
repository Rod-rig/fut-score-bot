export const content = {
  hello: (name, role = "USER") => {
    let baseMessage = `Hello ${name} 👋\n\nWelcome to Fut_Score_Bot 🥳\n\nHere you can test your intuition 🔮 and prediction skills 🧙 absolutely for free 🆓\n\nBy pressing 👉 /bet you'll get the list 📋 of available events to bet on. You'll need to guess the score or (at least) the outcome of each event. For each guessed result or outcome, you will be awarded 🏆 points corresponding to the odds in betting services.\n\nAvailable commands:\n/start - start bot 🤖 and read 📖 rules\n/bet    - start betting 🤔 (show available matches for predictions)\n/total_results - see general table of results 🏆\n/history - see your betting history 👀`;

    if (role === "ADMIN") {
      baseMessage += "\n/toggle_event_status - toggle event status 🔐";
      baseMessage += "\n/set_event_score - set event score 📊";
    }

    return baseMessage;
  },
  stickers: [
    "CAACAgIAAxkBAAElOQJk5RGXTrF6EYJFPR-UKV8WmvIhQQACoAADlp-MDmce7YYzVgABVTAE",
    "CAACAgIAAxkBAAElcXFk7PZQqio82lTUR0mYR27T3ZO_pAACVQIAAladvQqsSyyCT6MV3zAE",
    "CAACAgIAAxkBAAElcXNk7PaMks_fM0srZsNXbms7BQHDBwACAQEAAladvQoivp8OuMLmNDAE",
    "CAACAgIAAxkBAAElcXVk7Paxee3UZl9BJDF9Df3AgBoH1wACewMAApzW5woM_-gzW0OkzjAE",
    "CAACAgIAAxkBAAElcXlk7PbM3hNHfDMvgEGIMrkP-OxgiQACIwEAAjDUnRGe2TeBrqpcAjAE",
    "CAACAgIAAxkBAAElcXtk7PbacARGnJZWH1o8s__YnUr4QgAC2A8AAkjyYEsV-8TaeHRrmDAE",
    "CAACAgIAAxkBAAElcX9k7PcGPuJRuEmJGnPQMGvWRrqMZgACBQADwDZPE_lqX5qCa011MAQ",
    "CAACAgIAAxkBAAElcYFk7PcW8PabMtCtu68lnb67KyrUbgACiwEAAiteUwujYbxpJDSDUDAE",
    "CAACAgIAAxkBAAElcYNk7PcqN_9UnRNIoECzfamjRCY4hAACVAADQbVWDGq3-McIjQH6MAQ",
    "CAACAgIAAxkBAAElcYVk7PdKEYZDmAxjqU2Mg_gwsyLbsgAC_AAD9wLID-JKwmellSruMAQ",
  ],
  bet: "🏆 Bet on following matches:",
  success: "✅ You've successfully submitted your prediction for match",
  error: "❌ Wrong command. Please choose correct command from menu.",
  warning: "⚠️ You've already made prediction on this event",
  tech_works:
    "🚫 Betting will be available later. We will send you notification 📨 when it will be possible to place new bets.",
  odds: (match) => `🤞 Choose your prediction for ${match}`,
  new_user: "New user was registered.",
  history: "⬇️ 50 last predicted matches ⬇️\n\n",
};
