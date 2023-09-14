// import { child, get, ref } from "firebase/database";
// import { database } from "./db.js";
// import TelegramBot from "node-telegram-bot-api";
//
// const bot = new TelegramBot("6498914526:AAHNo7gN5NzdvZEvlOw7sphc9zGl5Mo45hw", {
//   polling: true,
// });
// const uaEngPhrase = (username) => `Привіт ${username} 👋\n\nНастає час вирішальних матчів ⚽️. У суботу збірна України 🇺🇦 зіграла внічию 1️⃣:1️⃣ із Англією 🏴󠁧󠁢󠁥󠁮󠁧󠁿 і зробила ще один крок до виходу на Євро-2024 🏆. \n\nНаступний матч ще більш важливий 🚨 – сьогодні наша головна команда 💙💛 зустрінеться зі своїм основним конкурентом за вихід на Євро – збірною Італії 🇮🇹. Італійці у суботу несподівано втратили очки 🥳, зігравши внічию проти Північної Македонії. Таким чином, наразі Італія 🤌 відстає від України на 3 очки, але має матч в запасі. Взагалі, Італія традиційно є для нас дуже незручним суперником 😡, але віримо, що нашим під силу не програти 💪.\n\nТому не гай час ⏰ і залишай свої прогнози на матчі у цьому боті 🤖 /bet`;
// const sendNotification = async () => {
//   const usersObj = await get(child(ref(database), `/users/`));
//   const users = usersObj.val();
//   for (const key of Object.keys(users)) {
//     try {
//       const resultsPhrase = `Hi ${users[key].first_name} 👋 \n\n✅ Your result is ${users[key].result} points. See your current table position by pressing /total_results`;
//       await bot.sendMessage(key, resultsPhrase);
//       console.log(
//         `✅ Notification was successfully sent to ${users[key].first_name}`
//       );
//     } catch (e) {
//       console.log("❌", e.name, e.message);
//     }
//   }
//   // await bot.sendMessage(449442235, uaEngPhrase(users[449442235].first_name));
//   // process.exit(1);
// };
//
// sendNotification();
