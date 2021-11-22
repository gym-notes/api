import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1970).max(2013),
});

export default schema;
