import authentication from "../middleware/authentication.js";
import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authentication.authenticate, authController.register);

export default router;
