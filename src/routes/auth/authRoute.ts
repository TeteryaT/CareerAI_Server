import express from "express";
const router = express.Router();
import { authController } from "../../controllers/auth/authController";
import { validateRegistration } from "../../middlewares/auth/registerMiddleware";

router.post("/register", validateRegistration, authController.registrateUser);
router.post("/login", authController.login);

export default router;
