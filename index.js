import { startServer } from "./server/index.js";
import { startBot } from "./bot/index.js";

await startServer();
startBot();
