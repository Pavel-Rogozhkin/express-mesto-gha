/* eslint-disable import/no-unresolved */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const DATA_CODE = 400;
const AUTH_CODE = 401;
const NOTFOUND_CODE = 404;
const SERVER_CODE = 500;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере' });
  }
};

const createNewUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(AUTH_CODE).send({ message: 'Требуется авторизация' });
  }
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 11);
    const newUser = await new User({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashPassword,
    }).save();
    return res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(NOTFOUND_CODE).send({ message: 'Пользователь по указанному ID не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при поиске пользователя по ID' });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере' });
  }
};

const updateMainUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным ID не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере' });
  }
};

const updateMainUserAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, {
      new: true,
    });
    if (!user) {
      return res.status(NOTFOUND_CODE).send({ message: 'Пользователь с указанным ID не найден' });
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере' });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(AUTH_CODE).send({ message: 'Требуется авторизация' });
    }
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign({ _id: user._id }, 'Enigma');
      res.cookie('jwt', token, {
        expiresIn: '7d',
        httpOnly: true,
      });
      return res.send(user);
    }
    return res.status(401).send({ message: 'Требуется авторизация' });
  } catch (err) {
    return next();
  }
};

const getMainUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.send(user);
  } catch (err) {
    return next();
  }
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
  login,
  getMainUserInfo,
};
