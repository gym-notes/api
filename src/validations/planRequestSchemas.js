import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const objectId = JoiObjectId(Joi);

const createPlanSchema = () => {
  const exercise = Joi.object({
    exerciseId: objectId().required(),
    series: Joi.number().min(1).required(),
    reps: Joi.number().min(1).required(),
    weight: Joi.number().min(1).required(),
  });

  return Joi.object({
    name: Joi.string().min(3).required(),
    exercises: Joi.array().items(exercise).required(),
  });
};

const getPlanByIdSchema = Joi.object({
  planId: objectId().required(),
});

export default { createPlanSchema: createPlanSchema(), getPlanByIdSchema };
