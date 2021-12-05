import mongoose from 'mongoose';

const exerciseScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'Exercises' }
);

export default mongoose.model('Exercise', exerciseScheme);
