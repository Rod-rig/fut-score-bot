import { prefixes } from "./prefixes.js";

export const scoresToButtons = (match) => {
  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: `0:0 - ${match.odd.zeroZero}`,
            callback_data: `${prefixes.score}_${match.id}_0:0`,
          },
          {
            text: `1:1 - ${match.odd.oneOne}`,
            callback_data: `${prefixes.score}_${match.id}_1:1`,
          },
        ],
        [
          {
            text: `2:2 - ${match.odd.twoTwo}`,
            callback_data: `${prefixes.score}_${match.id}_2:2`,
          },
          {
            text: `1:0 - ${match.odd.oneZero}`,
            callback_data: `${prefixes.score}_${match.id}_1:0`,
          },
        ],
        [
          {
            text: `2:0 - ${match.odd.twoZero}`,
            callback_data: `${prefixes.score}_${match.id}_2:0`,
          },
          {
            text: `3:0 - ${match.odd.threeZero}`,
            callback_data: `${prefixes.score}_${match.id}_3:0`,
          },
        ],
        [
          {
            text: `2:1 - ${match.odd.twoOne}`,
            callback_data: `${prefixes.score}_${match.id}_2:1`,
          },
          {
            text: `3:1 - ${match.odd.threeOne}`,
            callback_data: `${prefixes.score}_${match.id}_3:1`,
          },
        ],
        [
          {
            text: `3:2 - ${match.odd.threeTwo}`,
            callback_data: `${prefixes.score}_${match.id}_3:2`,
          },
          {
            text: `0:1 - ${match.odd.zeroOne}`,
            callback_data: `${prefixes.score}_${match.id}_0:1`,
          },
        ],
        [
          {
            text: `0:2 - ${match.odd.zeroTwo}`,
            callback_data: `${prefixes.score}_${match.id}_0:2`,
          },
          {
            text: `0:3 - ${match.odd.zeroThree}`,
            callback_data: `${prefixes.score}_${match.id}_0:3`,
          },
        ],
        [
          {
            text: `1:2 - ${match.odd.oneTwo}`,
            callback_data: `${prefixes.score}_${match.id}_1:2`,
          },
          {
            text: `1:3 - ${match.odd.oneThree}`,
            callback_data: `${prefixes.score}_${match.id}_1:3`,
          },
        ],
        [
          {
            text: `2:3 - ${match.odd.twoThree}`,
            callback_data: `${prefixes.score}_${match.id}_2:3`,
          },
          {
            text: `Any other - ${match.odd.anyOther}`,
            callback_data: `${prefixes.score}_${match.id}_Any Other`,
          },
        ],
      ],
    }),
  };
};
