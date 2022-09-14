const express = require('express');

const {
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:userId', getUserById);
usersRoutes.patch('/users/me', updateMainUser);
usersRoutes.patch('/users/me/avatar', updateMainUserAvatar);

module.exports = { usersRoutes };
