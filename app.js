/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const { celebrate, Joi, errors } = require('celebrate');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { createNewUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w\\.]+)\.([a-z]{2,6}\.?)(\/[\w\\.]*)*\/?$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createNewUser);

app.use(express.json());
app.use(auth);
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res, next) => {
  try {
    const error = new Error('Страница не найдена');
    error.statusCode = 404;
    return next(error);
  } catch (err) {
    return next();
  }
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function server() {
  mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
  });
}

server();
