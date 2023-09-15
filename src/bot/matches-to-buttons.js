import { showPrettyMatch } from "./show-pretty-match.js";
import { prefixes } from "./prefixes.js";

export const matchesToButtons = (events) => {
  const arr = [];
  events.forEach((e) => {
    arr.push([
      {
        text: showPrettyMatch(e),
        callback_data: `${prefixes.match}_${e.id}`,
      },
    ]);
  });
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: arr,
    }),
  };
};
