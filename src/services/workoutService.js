export default class WorkoutService {
  constructor(workout) {
    this.WorkoutModel = workout;
  }

  async getLatestWorkoutAsync(userId) {
    const workout = await this.WorkoutModel.findOne({ userId })
      .populate('planId')
      .populate({
        path: 'exercises',
        populate: { path: 'exerciseId', model: 'Exercise' },
      })
      .sort({ _id: -1 })
      .exec();

    console.log(workout);

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
