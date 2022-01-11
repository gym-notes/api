import Workout from '../models/Workout.js';
import Plan from '../models/Plan.js';
import Exercise from '../models/Exercise.js';
import WorkoutService from '../services/workoutService.js';
import PlanService from '../services/planService.js';
import ExerciseService from '../services/exerciseService.js';

const exerciseService = new ExerciseService(Exercise);
const planService = new PlanService(Plan);
const workoutService = new WorkoutService(Workout);

function mapWorkoutToResponse(workout) {
  const response = {
    id: workout.id,
    name: workout.planId.name,
    duration: workout.duration,
    date: workout.date.toISOString().slice(0, 10),
    exercises: workout.exercises.map((exercise) => ({
      id: exercise.exerciseId.id,
      name: exercise.exerciseId.name,
      sets: exercise.sets.map((set) => ({
        reps: set.reps,
        weight: set.weight,
      })),
    })),
  };
  return response;
}

export default {
  async getWorkoutsSummaries(req, res) {
    const workouts = await workoutService.getWorkouts({ userId: req.user.sub });

    if (workouts.length < 1) return res.status(204).send();

    let years = workouts.map((workout) => ({
      year: workout.date.getYear() + 1900,
      month: workout.date.getMonth() + 1,
    }));

    years = years.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.year === value.year && t.month === value.month)
    );

    const result = years.map((year) => ({
      year: year.year,
      month: year.month,
      workouts: workouts
        .filter(
          (workout) =>
            workout.date.getYear() + 1900 === year.year &&
            workout.date.getMonth() + 1 === year.month
        )
        .map((workout) => ({
          id: workout.id,
          planName: workout.planId.name,
          duration: workout.duration,
          exercisesNumber: workout.exercises.length,
          date: workout.date,
        })),
    }));

    return res.status(200).json(result);
  },

  async getWorkoutById(req, res) {
    const { workoutId } = req.params;
    const userId = req.user.sub;

    const workout = await workoutService.getWorkoutById(workoutId);

    if (!workout) return res.status(404).send();

    // eslint-disable-next-line eqeqeq
    if (workout.userId != userId) return res.status(403).send();

    return res.status(200).json(mapWorkoutToResponse(workout));
  },

  async getLatestWorkout(req, res) {
    const userId = req.user.sub;

    const workout = await workoutService.getLatestWorkoutAsync(userId);

    if (!workout) return res.status(404).send();

    return res.status(200).json(mapWorkoutToResponse(workout));
  },

  async createWorkout(req, res) {
    const workout = req.body;
    workout.userId = req.user.sub;
    workout.date = new Date().toISOString().slice(0, 10);

    const plan = await planService.getPlanById(workout.planId);

    if (!plan) return res.status(400).json({ errors: ["plan doesn't exists"] });

    // eslint-disable-next-line eqeqeq
    if (plan.userId != req.user.sub)
      return res
        .status(400)
        .json({ errors: ["plan doesn't belong to this user"] });

    const exercisesExist = await exerciseService.userExercisesExistAsync(
      workout.exercises,
      workout.userId
    );

    if (!exercisesExist)
      return res
        .status(400)
        .json({ errors: "some of your exercises don't exist" });

    const result = await workoutService.createWorkoutAsync(workout);

    return result.success
      ? res.status(201).json({ workoutId: result.data.id })
      : res.status(400).json({ errors: result.error, xd: 'xd' });
  },
};
