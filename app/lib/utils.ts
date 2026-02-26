import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isAnyOther = (score) => score.toLowerCase() === "any other";
const getResult = (score) => {
  if (!score || isAnyOther(score)) return;
  const [home, away] = score.split(":");
  return home > away ? "1" : home < away ? "2" : "X";
};
const isAnyOtherScore = (score) => {
  if (!score || isAnyOther(score)) return;
  const [home, away] = score.split(":");
  return home > 3 || away > 3;
};

const getUrl = (code) => `https://flagcdn.com/${code}.svg`;
const flags = {
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿": getUrl("gb-eng"),
  "🇩🇪": getUrl("de"),
  "🇮🇹": getUrl("it"),
  "🇫🇷": getUrl("fr"),
  "🇪🇸": getUrl("es"),
  "🇺🇦": getUrl("ua"),
  "🇵🇹": getUrl("pt"),
  "🇳🇱": getUrl("nl"),
  "🇹🇷": getUrl("tr"),
  un: getUrl("un"),
};
const getFlag = (code) => (flags[code] ? flags[code] : flags["un"]);

const filterNullScore = (prediction) => prediction.event.score;

const isCorrect1X2 = (p) => getResult(p.value) === getResult(p.event.score);

const calcBalance = (p, balance, stake) => {
  if (isAnyOther(p.value)) {
    return balance;
  }
  if (isCorrect1X2(p)) {
    const result = getResult(p.value);
    const key = result === "1" ? "one" : result === "2" ? "two" : "x";
    balance = Math.round(balance + (p.event.odd[key] - 1) * stake);
  } else {
    balance = balance - stake;
  }
  return balance;
};

export {
  isAnyOther,
  getResult,
  isAnyOtherScore,
  getFlag,
  filterNullScore,
  isCorrect1X2,
  calcBalance,
};
