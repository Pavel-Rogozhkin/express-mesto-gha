const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: 'Возникла ошибка на сервере...', ...e });
  }
};

const createNewUser = async (req, res) => {
  try {
    const newUser = await new User({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }).save();
    return res.status(200).send(newUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные в запросе', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере...', ...e });
  }
};

const getUserById = (req, res) => {
  res.send(req.body);
};

const updateMainUser = (req, res) => {
  res.send(req.body);
};

const updateMainUserAvatar = (req, res) => {
  res.send(req.body);
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
};
