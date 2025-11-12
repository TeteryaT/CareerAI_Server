import express from "express";
import { commentController } from "../../controllers/comment/commentController";
import { passportConfig } from "../../config/passport";

const router = express.Router();

router.get("/", commentController.getAll);

router.post(
  "/",
  passportConfig.authenticate("jwt", { session: false }),
  commentController.create
);

export default router;
