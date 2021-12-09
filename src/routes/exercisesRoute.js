import { Router } from 'express';
import exercisesController from '../controllers/exercisesController.js';
import requestSchemas from '../validations/exerciseRequestSchemas.js';
import authorize from '../middleware/authentication.js';
import { validateBody } from '../middleware/validation.js';

const router = Router();

router.post(
  '',
  authorize,
  validateBody(requestSchemas.createExerciseSchema),
  exercisesController.createExercise
);

router.get('/my', authorize, exercisesController.getMyExercises);

export default router;
