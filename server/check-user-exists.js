import { ref, child, get } from "firebase/database";
import { database } from "./db.js";

export const checkUserExists = async (chatId) => {
  const user = await get(child(ref(database), `/users/${chatId}`));
  return user.exists();
};
