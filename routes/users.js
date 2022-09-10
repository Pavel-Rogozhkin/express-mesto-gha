const express = require('express');

const {
  createNewUser,
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.post('/users', express.json(), createNewUser);
usersRoutes.get('/users', express.json(), getUsers);
usersRoutes.get('/users/:userId', express.json(), getUserById);
usersRoutes.patch('/users/me', express.json(), updateMainUser);
usersRoutes.patch('/users/me/avatar', express.json(), updateMainUserAvatar);

module.exports = { usersRoutes };
