const express = require('express');

const { createUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', express.json());
usersRoutes.get('/users/:userId', express.json());
usersRoutes.post('/users', express.json(), createUser);

module.exports = { usersRoutes };
