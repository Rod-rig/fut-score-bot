import { Router } from "express";
import { predictionController } from "../controller/prediction.js";

const router = Router();

router.get("/predictions", predictionController.getPredictions);
router.post("/prediction", predictionController.createPrediction);
router.put("/prediction", predictionController.updatePrediction);

export const predictionRouter = router;
