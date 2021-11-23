function validate(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    };

    const result = schema.validate(req.body, options);

    if (result.error)
      return res.status(400).json({
        errors: result.error.details.map((details) => details.message),
      });

    return next();
  };
}

export default validate;
