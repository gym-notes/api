import Workout from '../models/Workout.js';
import Plan from '../models/Plan.js';
import Exercise from '../models/Exercise.js';
import WorkoutService from '../services/workoutService.js';
import PlanService from '../services/planService.js';
import ExerciseService from '../services/exerciseService.js';

const exerciseService = new ExerciseService(Exercise);
const planService = new PlanService(Plan);
const workoutService = new WorkoutService(Workout);

export default {
  async getLatestWorkout(req, res) {
    const userId = req.user.sub;

    const workout = await workoutService.getLatestWorkoutAsync(userId);

    if (!workout) return res.status(404);

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

    return res.status(200).json(response);
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

    const exercisesExist = await exerciseService.exercisesExist(
      workout.exercises
    );

    if (!exercisesExist)
      return res
        .status(400)
        .json({ errors: "some of your exercises don't exist" });

    const exercisesBelongToUser =
      await exerciseService.exercisesBelongToUserAsync(
        workout.userId,
        workout.exercises
      );

    if (!exercisesBelongToUser)
      return res
        .status(400)
        .json({ errors: ["some of exercises doesn't belong to user"] });

    // console.log(workout);

    const result = await workoutService.createWorkoutAsync(workout);

    return result.success
      ? res.status(201).json({ workoutId: result.data.id })
      : res.status(400).json({ errors: result.error, xd: 'xd' });
  },
};
