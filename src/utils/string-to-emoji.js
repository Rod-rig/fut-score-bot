const stringToEmojiMap = {
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  spain: "🇪🇸",
  italy: "🇮🇹",
  germany: "🇩🇪",
  france: "🇫🇷",
  portugal: "🇵🇹",
  netherlands: "🇳🇱",
  ukraine: "🇺🇦",
  euroCups: "🇪🇺",
  international: "🌍",
  prevMatchday: "⏮",
  notfound: "🏳️",
};

export const stringToEmoji = (str) => {
  return stringToEmojiMap[str]
    ? stringToEmojiMap[str]
    : stringToEmojiMap["notfound"];
};
