const express = require('express');
const mongoose = require('mongoose');
const console = require('console');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '631c536b7c53b56cea88d2d1', // RPA - SWE
  };
  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);

app.get('', (req, res) => { res.send('Hello World'); });

async function server() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
  });
}

server();
