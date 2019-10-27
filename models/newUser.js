const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewUserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  age: {
    type: Number
  },
  list: {
    type: Array
  },
  login: {
    type: String,
    required: [true],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  }
});



const NewUser = mongoose.model('Users', NewUserSchema);

module.exports = NewUser;