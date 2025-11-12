import { Router } from "express";
import {
  getRecommendations,
  getUserHistory,
  getAllHistory,
} from "../../controllers/result/resultController";
import { passportConfig } from "../../config/passport";

const router = Router();

router.post(
  "/recommend",
  passportConfig.authenticate("jwt", { session: false }),
  getRecommendations
);
router.get(
  "/userhistory",
  passportConfig.authenticate("jwt", { session: false }),
  getUserHistory
);
router.get("/history", getAllHistory);

export default router;
