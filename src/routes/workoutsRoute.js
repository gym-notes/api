import { Router } from 'express';
import workoutController from '../controllers/workoutController.js';

const router = Router();

router.get('/:workoutId', workoutController.getWorkoutById);
router.get('', workoutController.getWorkouts);
router.post('', workoutController.createWorkout);
router.delete('/:workoutId', workoutController.deleteWorkoutById);
router.patch('/:workoutId', workoutController.updateWorkoutById);

export default router;
