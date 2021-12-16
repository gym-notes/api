export default class WorkoutService {
  constructor(workout) {
    this.WorkoutModel = workout;
  }

  async getWorkouts(workoutFilter) {
    const workouts = await this.WorkoutModel.find(workoutFilter)
      .sort({
        date: 'desc',
      })
      .populate('planId');

    return workouts;
  }

  async getWorkoutById(workoutId) {
    const workout = await this.WorkoutModel.findById(workoutId)
      .populate('planId')
      .populate({
        path: 'exercises',
        populate: { path: 'exerciseId', model: 'Exercise' },
      });
    return workout;
  }

  async getLatestWorkoutAsync(userId) {
    const workout = await this.WorkoutModel.findOne({ userId })
      .populate('planId')
      .populate({
        path: 'exercises',
        populate: { path: 'exerciseId', model: 'Exercise' },
      })
      .sort({ date: -1 })
      .exec();

    return workout;
  }

  async createWorkoutAsync(workout) {
    const newWorkout = this.WorkoutModel(workout);

    return newWorkout
      .save()
      .then((data) => ({ success: true, data }))
      .catch((error) => ({ success: false, errors: error.errors }));
  }
}
