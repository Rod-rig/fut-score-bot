import { child, get, ref } from "firebase/database";
import { database } from "./db.js";

const boldText = (text, condition) => (condition ? `<b>${text}</b>  👈` : text);
export const fetchResults = async (currentUser) => {
  const usersObj = await get(child(ref(database), `/users/`));
  const users = usersObj.val();
  const sortedUsers = Object.values(users).sort((a, b) => {
    if (a.result === undefined || b.result === undefined) {
      return -1;
    }
    return b.result - a.result;
  });
  const results = sortedUsers.map((user, index) => {
    const username = user.username
      ? user.username
      : user.first_name
      ? user.first_name
      : "No Name";
    const result = user.result ?? 0;
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
    return boldText(`${index + 1}. ${username} - ${result} points`, userToBold);
  });

  return results.join("\n");
};
