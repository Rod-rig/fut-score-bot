import { Router } from "express";
import { oddController } from "../controller/odd.js";

const router = Router();

router.post("/odd/:id", oddController.createOdd);

export const oddRouter = router;
