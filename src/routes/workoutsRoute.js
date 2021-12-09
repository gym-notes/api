import { Router } from 'express';
import workoutController from '../controllers/workoutController.js';
import authorize from '../middleware/authentication.js';
import { validateBody } from '../middleware/validation.js';
import requestSchemas from '../validations/workoutRequestSchemas.js';

const router = Router();

router.post(
  '',
  authorize,
  validateBody(requestSchemas.createWorkoutSchema),
  workoutController.createWorkout
);

export default router;
