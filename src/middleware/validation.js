const options = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, options);

    if (result.error)
      return res.status(400).json({
        errors: result.error.details.map((details) => details.message),
      });

    return next();
  };
}

function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.params, options);

    if (result.error)
      return res.status(400).json({
        errors: result.error.details.map((details) => details.message),
      });

    return next();
  };
}

export { validateBody, validateParams };
