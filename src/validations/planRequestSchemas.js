import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const myJoiObjectId = JoiObjectId(Joi);

const exercise = Joi.object({
  exerciseId: myJoiObjectId().required(),
  series: Joi.number().min(1).required(),
  reps: Joi.number().min(1).required(),
  weight: Joi.number().min(1).required(),
});

const createPlanSchema = Joi.object({
  name: Joi.string().min(3).required(),
  exercises: Joi.array().items(exercise).required(),
});

export default { createPlanSchema };
