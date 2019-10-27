const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
  done: {
    type: Boolean,
    default: false
  }
});

const ToDo = mongoose.model('ToDoList', ToDoSchema);

module.exports = ToDo;