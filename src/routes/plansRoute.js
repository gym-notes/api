import { Router } from 'express';
import authenticate from '../middleware/authentication.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import plansController from '../controllers/planController.js';
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

router.delete(
  '/:planId',
  authenticate,
  validateParams(requestSchemas.deletePlanByIdSchema),
  plansController.deletePlanById
);

export default router;
