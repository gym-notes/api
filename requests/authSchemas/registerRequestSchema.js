import Joi from 'joi';

const schema = Joi.object({
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
});

export default schema;
