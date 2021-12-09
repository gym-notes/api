export default class WorkoutService {
  constructor(workout) {
    this.WorkoutModel = workout;
  }

  async createWorkoutAsync(workout) {
    const newWorkout = this.WorkoutModel(workout);

    return newWorkout
      .save()
      .then((data) => ({ success: true, data }))
      .catch((error) => ({ success: false, errors: error.errors }));
  }
}
