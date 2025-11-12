import express from "express";
import { answerController } from "../../controllers/answer/answerController";

const router = express.Router();

router.post("/", answerController.create);

router.get("/comment/:commentId", answerController.getByComment);

router.get("/", answerController.getAll);

export default router;
