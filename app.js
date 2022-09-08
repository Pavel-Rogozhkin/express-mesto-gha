const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

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
