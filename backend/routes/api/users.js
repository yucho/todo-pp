const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const router = express.Router();

router.get('/', (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log(user);
        return res.status(400).json({ email: "email already taken" })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;

            const newUser = new User({
              handle: req.body.handle,
              email: req.body.email,
              password: hash
            });
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        });
      }
    });
});

router.post('/login', (req, res) => {
});

module.exports = router;
