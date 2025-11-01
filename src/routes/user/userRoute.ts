import express from "express";
const router = express.Router();
import { passportConfig } from "../../config/passport";
import { UserController } from "../../controllers/user/userController";
router.get(
  "/",
  passportConfig.authenticate("jwt", { session: false }),
  UserController.getNameAndSurname
);

export default router;
