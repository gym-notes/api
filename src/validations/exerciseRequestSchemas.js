import Joi from 'joi';

const createExerciseSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

export default { createExerciseSchema };
