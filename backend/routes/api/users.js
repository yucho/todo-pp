const bcrypt   = require('bcrypt');
const express  = require('express');
const codes    = require('http-status-codes');
const jwt      = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');
const { authenticate, handleServerError } = require('./util');

const router = express.Router();

router.get('/', (req, res) => res.json({ msg: "This is the users route" }));

const createTutorialTasks = (user) => {
  Task.create({ user, body: 'Click "Add Task" to create a new task!' });
  Task.create({ user, body: '← checkbox to mark as done' });
  Task.create({ user, body: 'Table headers toggle sort', due: new Date() });
};

router.post('/register', handleServerError(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(codes.BAD_REQUEST)
      .jsend.fail({ email: "Email already taken" });
  }

  const hash = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

  const newUser = await User.create({
    handle: req.body.handle,
    email: req.body.email,
    password: hash
  });

  createTutorialTasks(newUser);
  const { _id, handle, email } = newUser;
  res.status(codes.CREATED).jsend.success({ _id, handle, email });
}));

router.post('/login', handleServerError(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(codes.NOT_FOUND).jsend.fail({ email: 'Email not found' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    const payload = { id: user.id, name: user.handle };
    return jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 },
      (err, token) => {
        res.status(codes.OK).jsend.success({ token: 'Bearer ' + token });
      }
    );
  } else {
    return res
      .status(codes.BAD_REQUEST)
      .jsend.fail({ password: 'Incorrect password' });
  }
}));

router.get('/current', authenticate, handleServerError(async (req, res) => {
  res.status(codes.OK).jsend.success({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
}));

module.exports = router;
