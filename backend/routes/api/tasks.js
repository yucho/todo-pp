const express  = require('express');
const codes    = require('http-status-codes');

const { authenticate, simplifyMongooseError } = require('./util');
const Task = require('../../models/Task');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).exec();
    res.status(codes.OK).jsend.success(tasks);
  } catch (e) {
    res.status(codes.NOT_FOUND).jsend.fail(err);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const newTask = await Task.create({
      user: req.user,
      body: req.body.body,
      due: req.body.due
    });
    res.status(codes.CREATED).jsend.success(newTask);
  } catch (e) {
    const errors = simplifyMongooseError(e);
    res.status(codes.BAD_REQUEST).jsend.fail(errors);
  }
});

router.patch('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({
      _id: req.params.id,
      user: req.user
    }, req.body, { new: true });
    res.status(codes.OK).jsend.success(task);
  } catch (e) {
    res.status(codes.BAD_REQUEST).jsend.fail(e);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Task.deleteOne({
      _id: req.params.id,
      user: req.user
    });
    res.status(codes.OK).jsend.success();
  } catch (e) {
    res.status(codes.BAD_REQUEST).jsend.fail(e);
  }
});

module.exports = router;
