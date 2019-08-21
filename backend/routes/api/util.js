const codes = require('http-status-codes');
const passport = require('passport');

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(codes.UNAUTHORIZED).jsend.error('Unauthorized');
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

const simplifyMongooseError = (err) => {
  const { errors } = err;
  const simplifiedError = {};
  for (const key of Object.keys(errors)) {
    const { message } = errors[key];
    simplifiedError[key] = message;
  }
  return simplifiedError;
};

module.exports = {
  authenticate,
  handleServerError,
  simplifyMongooseError
};
