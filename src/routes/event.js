import { Router } from "express";
import { eventController } from "../controller/event.js";

const router = Router();

router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEventByIdWithOdds);
router.get(
  "/event-predictions/:id",
  eventController.getEventByIdWithPredictions,
);
router.get("/events-to-bet/:userId", eventController.getEventsToBet);
router.post("/event/:id", eventController.createEvent);

export const eventRouter = router;
