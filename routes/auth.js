import { Router } from "express";
import authController from "../controllers/authController.js";
import validate from "../middleware/validation.js";
import loginSchema from "../requests/authSchemas/loginRequestSchema.js";
import registerSchema from "../requests/authSchemas/registerRequestSchema.js";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);
router.post("/register", validate(registerSchema), authController.register);

export default router;
