import "dotenv/config";
import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";

const app = express();
app.use(cors());
ViteExpress.config({ mode: process.env.NODE_ENV });

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
