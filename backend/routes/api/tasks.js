const express  = require('express');
const codes    = require('http-status-codes');

const {
  authenticate,
  handleServerError,
  jsendifyMongooseError
} = require('./util');
const Task = require('../../models/Task');

const router = express.Router();

router.get('/', authenticate, handleServerError(async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).select('body status due').exec();
    res.status(codes.OK).jsend.success(tasks);
  } catch (e) {
    res.status(codes.NOT_FOUND).jsend.fail(jsendifyMongooseError(e));
  }
}));

router.post('/', authenticate, handleServerError(async (req, res) => {
  try {
    const { _id, body, status, due } = await Task.create({
      user: req.user,
      body: req.body.body,
      due: req.body.due
    });
    res.status(codes.CREATED).jsend.success({ _id, body, status, due });
  } catch (e) {
    res.status(codes.BAD_REQUEST).jsend.fail(jsendifyMongooseError(e));
  }
}));

router.patch('/:id', authenticate, handleServerError(async (req, res) => {
  try {
    const { _id, body, status, due } = await Task.findOneAndUpdate({
      _id: req.params.id,
      user: req.user
    }, req.body, { new: true, runValidators: true });
    res.status(codes.OK).jsend.success({ _id, body, status, due });
  } catch (e) {
    res.status(codes.BAD_REQUEST).jsend.fail(jsendifyMongooseError(e));
  }
}));

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Task.deleteOne({
      _id: req.params.id,
      user: req.user
    });
    res.status(codes.OK).jsend.success(null);
  } catch (e) {
    res.status(codes.BAD_REQUEST).jsend.fail(jsendifyMongooseError(e));
  }
});

module.exports = router;
