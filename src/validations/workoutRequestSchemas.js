import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const objectId = JoiObjectId(Joi);

const createWorkoutSchema = () => {
  const set = Joi.object({
    reps: Joi.number().min(1).required(),
    weight: Joi.number().min(1).required(),
  });

  const exercise = Joi.object({
    exerciseId: objectId().required(),
    sets: Joi.array().min(1).items(set).required(),
  });

  return Joi.object({
    planId: objectId(),
    duration: Joi.number().min(1).required(),
    exercises: Joi.array().min(1).items(exercise).required(),
  });
};

export default { createWorkoutSchema: createWorkoutSchema() };
