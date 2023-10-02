import { Router } from "express";
import { resultsController } from "../controller/results.js";

const router = Router();

router.put("/results/:id", resultsController.createResults);

export const resultsRouter = router;
