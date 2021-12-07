export default class ExerciseService {
  constructor(exerciseModel) {
    this.ExerciseModel = exerciseModel;
  }

  async exerciseExistsAsync(exercise) {
    const foundExercise = await this.ExerciseModel.findOne(exercise);

    return foundExercise != null;
  }

  createExercise(exercise) {
    const newExercise = new this.ExerciseModel(exercise);

    return newExercise
      .save()
      .then((data) => ({ success: true, data }))
      .catch((err) => ({ success: false, errors: err.errors }));
  }

  getExercisesByUserId(userId) {
    return this.ExerciseModel.find({ userId });
  }
}
