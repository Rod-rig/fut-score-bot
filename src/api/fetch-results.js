import "dotenv/config";
import { stringToEmoji } from "../utils/string-to-emoji.js";

const boldText = (text, condition) => (condition ? `<b>${text}</b>  👈` : text);
export const fetchResults = async (currentUser, key) => {
  try {
    const response = await fetch(`${process.env.ROOT_URL}/api/users`);
    const users = await response.json();
    const field = key ? key : "total";
    const prefix = key
      ? `Total score for ${stringToEmoji(key)} ${key.toUpperCase()}\n`
      : "";
    const sortedUsers = users.sort(
      (a, b) => b.results[field] - a.results[field],
    );
    const results = sortedUsers.map((user, index) => {
      const username = user.username
        ? user.username
        : user.firstName
          ? user.firstName
          : "No Name";
      const result = user.results[field] ?? 0;
      const userToBold = user.id.toString() === currentUser.toString();
      if (index === 0) {
        return boldText(`1️⃣🏆${username} - ${result} points`, userToBold);
      }
      if (index === 1) {
        return boldText(`2️⃣🥈${username} - ${result} points`, userToBold);
      }
      if (index === 2) {
        return boldText(`3️⃣🥉${username} - ${result} points`, userToBold);
      }
      return boldText(
        `${index + 1}. ${username} - ${result} points`,
        userToBold,
      );
    });

    return [prefix, ...results].join("\n");
  } catch (error) {
    console.log(error);
  }
};
