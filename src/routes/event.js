import { Router } from "express";
import { eventController } from "../controller/event.js";

const router = Router();

router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEventById);
router.get("/events-to-bet", eventController.getEventsToBet);

export const eventRouter = router;
