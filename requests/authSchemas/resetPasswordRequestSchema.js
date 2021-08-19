import Joi from "joi";

const schema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string()
    .required()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .messages({
      "string.pattern.base":
        "{{#label}} must contains at least: one lowercase alphabetical character, one uppercase alphabetical character, one numeric character and one special character",
    }),
  confirmNewPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({ "any.only": "{{#label}} does not match" }),
});

export default schema;
