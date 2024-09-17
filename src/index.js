import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/user.js";
import { eventRouter } from "./routes/event.js";
import { oddRouter } from "./routes/odd.js";
import { predictionRouter } from "./routes/prediction.js";
import { resultsRouter } from "./routes/results.js";
import { startBot } from "./bot/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(__dirname + "../dist"));
app.use(express.json());
app.get("/api", userRouter);
app.get("/api", eventRouter);
app.get("/api", oddRouter);
app.get("/api", predictionRouter);
app.get("/api", resultsRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});
app.listen(process.env.PORT);
startBot();
