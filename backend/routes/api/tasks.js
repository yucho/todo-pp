const express = require('express');
const passport = require('passport');
const Task = require('../../models/Task');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const query = Task.find({ user: req.user });
  query.exec((err, tasks) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(tasks);
    }
  });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newTask = new Task({
    user: req.user,
    body: req.body.body,
    due: req.body.due
  });
  newTask.save()
    .then((task) => {
      res.json(task);
    }).catch((err) => {
      res.status(400).json(err);
    });
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({
      _id: req.params.id,
      user: req.user
    }, req.body, { new: true });
    res.json(task);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Task.deleteOne({
      _id: req.params.id,
      user: req.user
    });
    res.status(200).json('success');
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
