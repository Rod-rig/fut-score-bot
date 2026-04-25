const getUrl = (code: string) => `https://flagcdn.com/${code}.svg`;
const flags: Record<string, string> = {
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
export const getFlag = (code: string) =>
  flags[code] ? flags[code] : flags["un"];
