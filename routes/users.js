const express = require('express');

const {
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
  getMainUserInfo,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:userId', getUserById);
usersRoutes.get('/users/me', getMainUserInfo);
usersRoutes.patch('/users/me', updateMainUser);
usersRoutes.patch('/users/me/avatar', updateMainUserAvatar);

module.exports = { usersRoutes };
