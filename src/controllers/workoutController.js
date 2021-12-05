import Workout from '../models/Workout.js';

export default {
  async getWorkoutById(req, res) {
    try {
      const workouts = await Workout.findById(req.params.workoutId);
      res.json(workouts);
    } catch {
      res
        .status(500)
        .json({ message: 'Something went wrong, try again later.' });
    }
  },

  async getWorkouts(req, res) {
    try {
      const workouts = await Workout.find();
      res.json(workouts);
    } catch {
      res
        .status(500)
        .json({ message: 'Something went wrong, try again later.' });
    }
  },

  async deleteWorkoutById(req, res) {
    try {
      await Workout.findByIdAndDelete(req.params.workoutId);
      res.status(204).json();
    } catch {
      res
        .status(500)
        .json({ message: 'Something went wrong, try again later.' });
    }
  },

  async createWorkout(req, res) {
    const workout = new Workout({
      title: req.body.title,
      date: req.body.date,
    });

    workout
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  },

  async updateWorkoutById(req, res) {
    try {
      const updatedWorkout = await Workout.updateOne(
        { _id: req.params.workoutId },
        { $set: { title: req.body.title } }
      );

      res.status(200).json(updatedWorkout);
    } catch {
      res
        .status(500)
        .json({ message: 'Something went wrong, try again later.' });
    }
  },
};
