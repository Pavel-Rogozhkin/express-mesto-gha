const express = require('express');

const usersRoutes = express.Router();

usersRoutes.get('/users', express.json());
usersRoutes.get('/users/:userId', express.json());
usersRoutes.post('/users', express.json());

module.exports = { usersRoutes };
