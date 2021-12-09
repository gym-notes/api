import { Router } from 'express';
import authenticate from '../middleware/authentication.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import plansController from '../controllers/plansController.js';
import requestSchemas from '../validations/planRequestSchemas.js';

const router = Router();

router.post(
  '',
  authenticate,
  validateBody(requestSchemas.createPlanSchema),
  plansController.createPlan
);

router.get('/my', authenticate, plansController.getMyPlans);

router.get(
  '/:planId',
  authenticate,
  validateParams(requestSchemas.getPlanByIdSchema),
  plansController.getPlanById
);

export default router;
