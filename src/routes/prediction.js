import { Router } from "express";
import { predictionController } from "../controller/prediction.js";

const router = Router();

router.get("/predictions", predictionController.getPredictions);
router.get("/predictions/:id", predictionController.getPredictionHistory);
router.post("/prediction-by-id", predictionController.getPredictionById);
router.post("/prediction", predictionController.createPrediction);
router.post("/prediction-batch", predictionController.createPredictionBatch);
router.put("/prediction", predictionController.updatePrediction);

export const predictionRouter = router;
