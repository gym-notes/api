import { Router } from 'express';
import workoutController from '../controllers/workoutController.js';
import authorize from '../middleware/authentication.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import requestSchemas from '../validations/workoutRequestSchemas.js';

const router = Router();

router.post(
  '',
  authorize,
  validateBody(requestSchemas.createWorkoutSchema),
  workoutController.createWorkout
);

router.get('/latest', authorize, workoutController.getLatestWorkout);

router.get('/summaries', authorize, workoutController.getWorkoutsSummaries);

router.get(
  '/:workoutId',
  authorize,
  validateParams(requestSchemas.getWorkoutById),
  workoutController.getWorkoutById
);

export default router;
