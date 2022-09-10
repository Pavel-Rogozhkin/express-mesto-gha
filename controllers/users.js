const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
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
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'Пользователь по указанному ID не найден' });
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при поиске пользователя по ID' });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const updateMainUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'Пользователь с указанным ID не найден' });
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const updateMainUserAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: 'Пользователь с указанным ID не найден' });
    }
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

module.exports = {
  createNewUser,
  getUsers,
  getUserById,
  updateMainUser,
  updateMainUserAvatar,
};
