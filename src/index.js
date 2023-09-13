import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/user.js";
import { eventRouter } from "./routes/event.js";
import { predictionRouter } from "./routes/prediction.js";
import { startBot } from "./bot/index.js";

const app = express();
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", predictionRouter);
app.listen(process.env.PORT);
startBot();
