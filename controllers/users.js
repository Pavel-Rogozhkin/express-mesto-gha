/* eslint-disable import/no-unresolved */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthError } = require('../errors/auth-err');
const { ConfError } = require('../errors/conf-err');
const { NotFoundError } = require('../errors/not-found-err');
const { ReqError } = require('../errors/req-err');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return next();
  }
};

const createNewUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!req.body.email || !req.body.password) {
    return next(new AuthError('Требуется авторизация'));
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
    return res.send({ data: newUser });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConfError('Пользователь с указанным email уже зарегистрирован'));
    }
    if (err.name === 'ValidationError') {
      return next(new ReqError('Переданы некорректные данные при создании пользователя'));
    }
    return next();
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному ID не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ReqError('Переданы некорректные данные при поиске пользователя по ID'));
    }
    return next();
  }
};

const updateMainUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('Пользователь с указанным ID не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ReqError('Переданы некорректные данные при обновлении профиля'));
    }
    return next();
  }
};

const updateMainUserAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, {
      new: true,
    });
    if (!user) {
      return next(new NotFoundError('Пользователь с указанным ID не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ReqError('Переданы некорректные данные при обновлении аватара'));
    }
    return next();
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AuthError('Требуется авторизация'));
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Требуется авторизация'));
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
    return next(new AuthError('Требуется авторизация'));
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
