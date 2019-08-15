const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    enum: ['open', 'closed'],
    default: 'open',
    required: true
  },
  due: {
    type: Date
  }
});

export default Task = mongoose.model('tasks', TaskSchema);
