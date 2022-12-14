const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { regexValidUrl } = require('../utils/consts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => regexValidUrl.test(v),
      message: 'Поле "avatar" должно быть валидным url-адресом',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
    select: false,
  },
}, {
  versionKey: false,
  toObject: { useProjection: true },
  toJSON: { useProjection: true },
});

module.exports = mongoose.model('user', userSchema);
