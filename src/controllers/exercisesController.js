import Exercise from '../models/Exercise.js';
import ExerciseService from '../services/exerciseService.js';

const exerciseService = new ExerciseService(Exercise);

export default {
  async getMyExercises(req, res) {
    const exercises = await exerciseService.getExercisesByUserId(req.user.sub);

    if (exercises.length < 1) return res.status(204);

    return res
      .status(200)
      .json(
        exercises.map((exercise) => ({ id: exercise.id, name: exercise.name }))
      );
  },

  async createExercise(req, res) {
    const exercise = {
      name: req.body.name,
      userId: req.user.sub,
    };

    const exerciseExists = await exerciseService.exerciseExistsAsync(exercise);

    if (exerciseExists === true)
      return res.status(400).json({ error: 'Exercise already exists' });

    const result = await exerciseService.createExercise(exercise);

    if (!result.success) return res.status(400).json({ errors: result.errors });

    return res.status(201).json({ exerciseId: result.data.id });
  },
};
