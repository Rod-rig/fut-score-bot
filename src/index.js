import path from "path";
import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/user.js";
import { eventRouter } from "./routes/event.js";
import { oddRouter } from "./routes/odd.js";
import { predictionRouter } from "./routes/prediction.js";
import { resultsRouter } from "./routes/results.js";
import { startBot } from "./bot/index.js";

const app = express();
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", oddRouter);
app.use("/api", predictionRouter);
app.use("/api", resultsRouter);
app.use(express.static("dist"));
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

app.listen(process.env.PORT);
startBot();
