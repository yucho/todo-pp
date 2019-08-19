const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');

const router = express.Router();

router.get('/', (req, res) => res.json({ msg: "This is the users route" }));

const createTutorialTasks = (user) => [
  new Task({
    user,
    body: 'Click "Add Task" to create a new task!'
  }),
  new Task({
    user,
    body: '← checkbox to mark as done'
  }),
  new Task({
    user,
    body: 'Table headers toggle sort',
    due: new Date()
  })
];

router.post('/register', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ email: "Email already taken" })
  } else {
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
    for (task of createTutorialTasks(newUser)) {
      await task.save();
    }
    const { _id, handle, email } = newUser;
    res.json({ _id, handle, email });
  }
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'Email not found' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = { id: user.id, name: user.handle };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        });
    });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
});

module.exports = router;
