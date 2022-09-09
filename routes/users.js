const express = require('express');

const {
  createUser,
  getUser,
  getUserById,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', express.json(), getUser);
usersRoutes.get('/users/:userId', express.json(), getUserById);
usersRoutes.post('/users', express.json(), createUser);

module.exports = { usersRoutes };
