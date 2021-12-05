import { Router } from 'express';
import authController from '../controllers/authController.js';
import validate from '../middleware/validation.js';
import loginSchema from '../validations/loginRequestSchema.js';
import registerSchema from '../validations/registerRequestSchema.js';
import resetPasswordSchema from '../validations/resetPasswordRequestSchema.js';
import remindPasswordSchema from '../validations/remindPasswordRequestSchema.js';

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
