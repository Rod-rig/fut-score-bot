import express from "express";
import {matches} from "../content/events/matches.js";

export const startServer = async () => {
  const app = express();

  app.get("/matches", function (req, res) {
    res.send(matches);
  });

  app.listen(3000);
};
