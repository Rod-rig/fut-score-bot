import { Router } from "express";
import { eventController } from "../controller/event.js";

const router = Router();

router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEventById);
router.get("/events-to-bet/:userId", eventController.getEventsToBet);
router.post("/event/:id", eventController.createEvent);

export const eventRouter = router;
