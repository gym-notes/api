import { Router } from 'express';
import authController from '../controllers/authController.js';
import { validateBody } from '../middleware/validation.js';
import loginSchema from '../validations/loginRequestSchema.js';
import registerSchema from '../validations/registerRequestSchema.js';
import resetPasswordSchema from '../validations/resetPasswordRequestSchema.js';
import remindPasswordSchema from '../validations/remindPasswordRequestSchema.js';

const router = Router();

router.post('/login', validateBody(loginSchema), authController.login);
router.post('/register', validateBody(registerSchema), authController.register);
router.post(
  '/remind-password',
  validateBody(remindPasswordSchema),
  authController.remindPassword
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  authController.resetPassword
);

export default router;
