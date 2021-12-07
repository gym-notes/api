import { Router } from 'express';
import exercisesController from '../controllers/exercisesController.js';
import requestSchemas from '../validations/exerciseRequestSchemas.js';
import authorize from '../middleware/authentication.js';
import validate from '../middleware/validation.js';

const router = Router();

router.post(
  '',
  authorize,
  validate(requestSchemas.createExerciseSchema),
  exercisesController.createExercise
);

export default router;
