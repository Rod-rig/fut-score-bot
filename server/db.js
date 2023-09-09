import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC7WAmc1PlN9wtS9dFtx9iUGeywoFcslr8",
  authDomain: "fut-score-bot.firebaseapp.com",
  databaseURL:
    "https://fut-score-bot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fut-score-bot",
  storageBucket: "fut-score-bot.appspot.com",
  messagingSenderId: "557515368837",
  appId: "1:557515368837:web:bdd6e6a6008e96c86b3cec",
  measurementId: "G-H8V26ZJTFX",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
