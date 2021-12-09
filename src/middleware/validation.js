const options = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

function validate(res, next, schema, model) {
  const result = schema.validate(model, options);

  if (result.error)
    return res.status(400).json({
      errors: result.error.details.map((details) => details.message),
    });

  return next();
}

function validateBody(schema) {
  return (req, res, next) => {
    validate(res, next, schema, req.body);
  };
}

function validateParams(schema) {
  return (req, res, next) => {
    validate(res, next, schema, req.params);
  };
}

export { validateBody, validateParams };
