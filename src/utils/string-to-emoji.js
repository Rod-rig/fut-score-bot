const stringToEmojiMap = {
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  spain: "🇪🇸",
  italy: "🇮🇹",
  germany: "🇩🇪",
  france: "🇫🇷",
  portugal: "🇵🇹",
  netherlands: "🇳🇱",
  ukraine: "🇺🇦",
  notfound: "🏳️",
};

export const stringToEmoji = (str) => {
  return stringToEmojiMap[str]
    ? stringToEmojiMap[str]
    : stringToEmojiMap["notfound"];
};
