import { prefixes } from "./prefixes.js";

export const totalResultsButtons = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        {
          text: `🇪🇺 Europe`,
          callback_data: `${prefixes.results}_euroCups`,
        },
        {
          text: `🏴󠁧󠁢󠁥󠁮󠁧󠁿 England`,
          callback_data: `${prefixes.results}_england`,
        },
      ],
      [
        {
          text: `🇩🇪 Germany`,
          callback_data: `${prefixes.results}_germany`,
        },
        {
          text: `🇪🇸󠁧󠁢󠁥󠁮󠁧󠁿 Spain`,
          callback_data: `${prefixes.results}_spain`,
        },
      ],
      [
        {
          text: `🇮🇹 Italy`,
          callback_data: `${prefixes.results}_italy`,
        },
        {
          text: `🇫🇷󠁧󠁢󠁥󠁮󠁧󠁿 France`,
          callback_data: `${prefixes.results}_france`,
        },
      ],
      [
        {
          text: `🌍 International`,
          callback_data: `${prefixes.results}_international`,
        },
        {
          text: `⏮ Previous matchday`,
          callback_data: `${prefixes.results}_prevMatchday`,
        },
      ],
    ],
  }),
};
