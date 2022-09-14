const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { celebrate, Joi, errors } = require('celebrate');
const { createNewUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login,);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), createNewUser,); 

app.use(auth);
app.use(express.json());
app.use(usersRoutes);
app.use(cardsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errors());

async function server() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
  });
};

server();
