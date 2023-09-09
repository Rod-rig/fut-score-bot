import { ref, set } from "firebase/database";
import { database } from "./db.js";
import { checkUserExists } from "./check-user-exists.js";

export const auth = async (chat) => {
  const isUserExists = await checkUserExists(chat.id);
  if (!isUserExists) {
    set(ref(database, `users/${chat.id}`), {
      id: chat.id,
      username: chat.username ?? "",
      first_name: chat.first_name ?? "",
      last_name: chat.last_name ?? "",
      result: 0,
      created_at: Date.now(),
    });
  }
};
