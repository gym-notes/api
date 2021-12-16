import Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string().required(),
  weight: Joi.number().min(1).required(),
  height: Joi.number().min(1).required(),
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  country: Joi.string().required(),
});

export default schema;
