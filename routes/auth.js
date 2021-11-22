import { Router } from 'express';
import authController from '../controllers/authController.js';
import validate from '../middleware/validation.js';
import loginSchema from '../requests/authSchemas/loginRequestSchema.js';
import registerSchema from '../requests/authSchemas/registerRequestSchema.js';
import resetPasswordSchema from '../requests/authSchemas/resetPasswordRequestSchema.js';
import remindPasswordSchema from '../requests/authSchemas/remindPasswordRequestSchema.js';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.post(
  '/remind-password',
  validate(remindPasswordSchema),
  authController.remindPassword
);
router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword
);

export default router;
