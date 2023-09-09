import { ref, child, update, get } from "firebase/database";
import { database } from "./db.js";

const DIVIDER = "_";

export const createPrediction = async (chatId, prediction) => {
  const updates = {};
  let postData;
  const path = `/users/${chatId}/predictions`;
  const predictions = await get(child(ref(database), path));

  if (predictions.exists()) {
    const oldValueIndex = predictions
      .val()
      .findIndex((p) => p.split(DIVIDER)[0] === prediction.split(DIVIDER)[0]);
    if (oldValueIndex > -1) {
      const old = [...predictions.val()];
      old.splice(oldValueIndex, 1);
      postData = [...old, prediction];
    } else {
      postData = [...predictions.val(), prediction];
    }
  } else {
    postData = [prediction];
  }

  updates[path] = postData;
  return update(ref(database), updates);
};
