import { Router } from "express";
import { resultsController } from "../controller/results.js";

const router = Router();

router.get("/results/:id", resultsController.getResults);
router.put("/results/:id", resultsController.updateResults);

export const resultsRouter = router;
