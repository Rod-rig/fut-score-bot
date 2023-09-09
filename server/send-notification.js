import { child, get, ref } from "firebase/database";
import { database } from "./db.js";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot("6498914526:AAHNo7gN5NzdvZEvlOw7sphc9zGl5Mo45hw", {
  polling: true,
});
// const resultsPhrase = `Hi ${users[key].first_name} 👋 \n\n✅ Your weekend result is ${users[key].result} points. See your current table position by pressing /total_results`;
const uaEngPhrase = (username) => `Привіт ${username} 👋\n\nКлубні чемпіонати беруть паузу ⏸ і настає час національних збірних 🌍. Найголовніший матч тижня 📅 відбудеться завтра – у Вроцлаві збірна України 🇺🇦 зіграє проти Англії 🏴󠁧󠁢󠁥󠁮󠁧󠁿. Нагадаємо, що Англія в березні без проблем розібралась вдома із Україною – 2️⃣:0️⃣.\n\nПісля цього головним тренером збірної України був призначений Сергій Ребров 💪, і у червні команда грала вже під його керівництвом. Перемоги над Північною Македонією 🇲🇰 та Мальтою 🇲🇹 дались нашій головній команді непросто 😓, але 6 очок – то є 6 очок.\n\nЗавдяки цьому Україна змогла піднятися на 2️⃣ місце в групі. Італія 🇮🇹 відстає на три очки, але і зіграла на один матч менше. До очного двобою з Італією 🤌 хотілося б підійти маючи перевагу, а для цього обов’язково треба брати хоча б одне очко проти Англії.\n\nТому не гай час ⏰ і залишай свої прогнози на матчі у цьому боті 🤖 /bet`;
const sendNotification = async () => {
  const usersObj = await get(child(ref(database), `/users/`));
  const users = usersObj.val();
  for (const key of Object.keys(users)) {
    try {
      await bot.sendMessage(key, uaEngPhrase(users[key].first_name));
      console.log(
        `✅ Notification was successfully sent to ${users[key].first_name}`
      );
    } catch (e) {
      console.log("❌", e.name, e.message);
    }
  }
  // await bot.sendMessage(449442235, uaEngPhrase(users[449442235].first_name));
  process.exit(1);
};

// sendNotification();
