const express = require('express');

const {
  createUser,
  getUser,
  getUserById,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.post('/users', express.json(), createUser);
usersRoutes.get('/users', express.json(), getUser);
usersRoutes.get('/users/:userId', express.json(), getUserById);

module.exports = { usersRoutes };
