import { Router } from 'express';
import authenticate from '../middleware/authentication.js';
import validate from '../middleware/validation.js';
import plansController from '../controllers/plansController.js';
import requestSchemas from '../validations/planRequestSchemas.js';

const router = Router();

router.post(
  '',
  authenticate,
  validate(requestSchemas.createPlanSchema),
  plansController.createPlan
);

export default router;
