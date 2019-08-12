const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }
  ]
});

module.exports = User =  mongoose.model('users', UserSchema);
