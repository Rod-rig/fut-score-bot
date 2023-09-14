import "dotenv/config";
import { notifyMe } from "../bot/notify-me.js";
import { content } from "../content/index.js";

export const auth = async (bot, chat) => {
  const rootUrl = `${process.env.ROOT_URL}/api/user`;
  try {
    const response = await fetch(`${rootUrl}/${chat.id}`);
    const user = await response.json();
    if (!user) {
      await fetch(rootUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(chat),
      });
      await notifyMe(bot, `🥳 ${content.new_user} ${JSON.stringify(chat)}`);
    }
  } catch (error) {
    console.log(error);
  }
};
