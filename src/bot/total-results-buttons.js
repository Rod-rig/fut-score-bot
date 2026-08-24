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
          text: `🇺🇦 Ukraine`,
          callback_data: `${prefixes.results}_ukraine`,
        },
        {
          text: `🌍 International`,
          callback_data: `${prefixes.results}_international`,
        },
      ],
      [
        {
          text: `⏮ Previous matchday`,
          callback_data: `${prefixes.results}_prevMatchday`,
        },
        {
          text: `2024/25 season`,
          callback_data: `${prefixes.results}_twentyFour`,
        },
      ],
      [
        {
          text: `2025/26 season`,
          callback_data: `${prefixes.results}_twentyFive`,
        },
        {
          text: `2026/27 season`,
          callback_data: `${prefixes.results}_twentySeven`,
        },
      ],
      [
        {
          text: `Correct Score`,
          callback_data: `${prefixes.results}_exactScore`,
        },
        {
          text: `Correct Score, %`,
          callback_data: `${prefixes.results}_exactScorePercentage`,
        },
      ],
      [
        {
          text: `Correct 1X2`,
          callback_data: `${prefixes.results}_oneXTwo`,
        },
        {
          text: `Correct 1X2, %`,
          callback_data: `${prefixes.results}_oneXTwoPercentage`,
        },
      ],
      [
        {
          text: `Overall Profit`,
          callback_data: `${prefixes.results}_profit`,
        },
        {
          text: `ROI, %`,
          callback_data: `${prefixes.results}_roi`,
        },
      ],
    ],
  }),
};
