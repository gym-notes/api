import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Types.ObjectId,
      ref: 'Plan',
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    exercises: [
      {
        exerciseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        sets: [
          {
            reps: {
              type: Number,
              required: true,
            },
            weight: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { collection: 'Workouts' }
);

export default mongoose.model('Workout', workoutSchema);
