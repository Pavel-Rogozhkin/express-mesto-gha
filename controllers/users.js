const User = require('../models/user');

// const createUser = (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// };

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body).save();

    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы неккоректные данные', ...e });
    }
    return res.status(500).send({ message: 'Произошла ошибка на сервере', ...e });
  }
};

const getUser = (req, res) => {
  res.send(req.body);
};

const getUserById = (req, res) => {
  res.send(req.body);
};

module.exports = {
  createUser,
  getUser,
  getUserById,
};
