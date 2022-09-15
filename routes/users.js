const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
  getMainUserInfo,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/me', getMainUserInfo);

usersRoutes.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).alphanum(),
    }),
  }),
  getUserById,
);

usersRoutes.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateMainUser,
);

usersRoutes.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(/^(https?:\/\/)?([\w\\.]+)\.([a-z]{2,6}\.?)(\/[\w\\.]*)*\/?$/),
    }),
  }),
  updateMainUserAvatar,
);

module.exports = { usersRoutes };
