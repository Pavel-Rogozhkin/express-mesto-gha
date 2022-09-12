const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (valid) => isEmail(valid),
      message: 'Неверный формат почты',
    },
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
