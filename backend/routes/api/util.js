const codes = require('http-status-codes');
const passport = require('passport');

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(codes.UNAUTHORIZED).jsend.fail('Unauthorized');
    req.user = user;
    next();
  })(req, res, next);
};

const handleServerError = (route) => {
  return async (req, res, ...args) => {
    try {
      await route(req, res, ...args);
    } catch {
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .jsend.error('Something went wrong');
    }
  };
};

const jsendifyMongooseError = (err) => {
  const { errors } = err;

  // Single error
  if (!errors) {
    return jsendifySingleError(err);
  }

  // Multiple errors
  const jsendifiedError = {};
  for (const key of Object.keys(errors)) {
    jsendifiedError[key] = errors[key].message;
  }
  return jsendifiedError;
};

const jsendifySingleError = (err) => {
  const { path, message } = err;
  if (path) {
    return { [path]: message }
  } else {
    return message;
  }
}

module.exports = {
  authenticate,
  handleServerError,
  jsendifyMongooseError
};
