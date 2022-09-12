const express = require('express');

const {
  createNewUser,
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
} = require('../controllers/users').default;

const usersRoutes = express.Router();

usersRoutes.post('/users', createNewUser);
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:userId', getUserById);
usersRoutes.patch('/users/me', updateMainUser);
usersRoutes.patch('/users/me/avatar', updateMainUserAvatar);

module.exports = { usersRoutes };
