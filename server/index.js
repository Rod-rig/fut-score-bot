import express from "express";
import { readFile } from "fs/promises";

export const startServer = async () => {
  const app = express();
  const json = JSON.parse(
    await readFile(new URL("../content/events/matches.json", import.meta.url))
  );

  app.get("/matches", function (req, res) {
    res.send(json);
  });

  app.listen(3000);
};
