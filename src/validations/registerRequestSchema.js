import Joi from 'joi';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .messages({
      'string.pattern.base':
        '{{#label}} must contains at least: one lowercase alphabetical character, one uppercase alphabetical character, one numeric character and one special character',
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': '{{#label}} does not match' }),
  firstName: Joi.string().min(2).required(),
  weight: Joi.number().min(20).required(),
  height: Joi.number().min(50).required(),
  birthDate: Joi.date().required(),
  gender: Joi.string().valid('male', 'female').required(),
  country: Joi.string().min(3).required(),
});

export default registerSchema;
