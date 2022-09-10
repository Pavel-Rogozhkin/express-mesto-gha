const express = require('express');

const {
  createNewUser,
  getUser,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.post('/users', express.json(), createNewUser);
usersRoutes.get('/users', express.json(), getUser);
usersRoutes.get('/users/:userId', express.json(), getUserById);
usersRoutes.patch('/users/me', express.json(), updateMainUser);
usersRoutes.patch('/users/me/avatar', express.json(), updateMainUserAvatar);

module.exports = { usersRoutes };
