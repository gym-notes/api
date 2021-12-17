/* eslint-disable no-param-reassign */
import User from '../models/User.js';
import Exercise from '../models/Exercise.js';
import Workout from '../models/Workout.js';
import UsersService from '../services/usersService.js';
import ExerciseService from '../services/exerciseService.js';
import WorkoutService from '../services/workoutService.js';

const usersService = new UsersService(User);
const exerciseService = new ExerciseService(Exercise);
const workoutService = new WorkoutService(Workout);

export default {
  async getMyAccountInfo(req, res) {
    const user = await usersService.getUserByIdAsync(req.user.sub);

    return res.status(200).json({ email: user.email, data: user.data }).send();
  },

  async updateMyAccountInfo(req, res) {
    const update = req.body;

    await usersService.findByIdAndUpdateAsync(req.user.sub, update);

    return res.status(204).send();
  },

  // Please, don't read if you don't wanna get eyes injury.
  // Function created only for demonstration purposes and
  // should be rebuild for production
  async getUserRecords(req, res) {
    const userId = req.user.sub;

    const userExercises = await exerciseService.getExercisesByUserId(userId);

    if (userExercises.length === 0 || !userExercises)
      return res.status(204).send();

    const userWorkouts = await workoutService.getWorkoutsByUserIdAsync(userId);

    console.log(userWorkouts.length);

    const result = userExercises.map((exercise) => {
      const workoutsExercises = userWorkouts
        .filter((workout) =>
          workout.exercises.some(
            // eslint-disable-next-line eqeqeq
            (workoutExercise) => workoutExercise.exerciseId == exercise.id
          )
        )
        .map((workout) => workout.exercises);

      if (workoutsExercises.length === 0)
        return { name: exercise.name, record: null };

      const exercisesFromWorkouts = workoutsExercises.map((workoutExercise) =>
        // eslint-disable-next-line eqeqeq
        workoutExercise.find((element) => element.exerciseId == exercise.id)
      );

      const exercisesSets = exercisesFromWorkouts.map((exerciseFromWorkout) => {
        const recordRep = exerciseFromWorkout.sets.sort(
          (a, b) => a.weight - b.weight
        )[0];

        return {
          weight: recordRep.weight,
          reps: recordRep.reps,
        };
      });

      const sortedSets = exercisesSets.sort((a, b) => b.weight - a.weight);

      const recordSet = sortedSets
        .filter((set) => set.weight === sortedSets[0].weight)
        .sort((a, b) => b.reps - a.reps)[0];

      return {
        name: exercise.name,
        record: recordSet,
      };
    });

    return res.status(200).json(result).send();
  },
};
