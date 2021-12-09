import mongoose from 'mongoose';

export default class ExerciseService {
  constructor(exerciseModel) {
    this.ExerciseModel = exerciseModel;
  }

  async exerciseExistsAsync(exercise) {
    const foundExercise = await this.ExerciseModel.findOne(exercise);

    return foundExercise != null;
  }

  async exercisesExist(exercises) {
    const exercisesExist = await this.ExerciseModel.find({
      _id: {
        $in: exercises.map((exercise) =>
          mongoose.Types.ObjectId(exercise.exerciseId)
        ),
      },
    }).exec();

    return exercisesExist.length === exercises.length;
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

  async exercisesBelongToUserAsync(userId, exercises) {
    const foundExercises = await this.ExerciseModel.find({
      _id: {
        $in: exercises.map((exercise) =>
          mongoose.Types.ObjectId(exercise.exerciseId)
        ),
      },
    }).exec();

    if (foundExercises.length !== exercises.length) return false;

    for (let i = 0; i < foundExercises.length; i += 1) {
      // eslint-disable-next-line eqeqeq
      if (foundExercises[i].userId != userId) return false;
    }

    return true;
  }
}
