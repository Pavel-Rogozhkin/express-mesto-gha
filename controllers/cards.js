const Card = require('../models/card');

const DATA_CODE = 400;
const NOTFOUND_CODE = 404;
const SERVER_CODE = 500;

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (e) {
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await new Card({
      owner: req.user._id,
      ...req.body,
    }).save();
    return res.send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при создании карточки', ...e });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным ID не найдена' });
    }
    return res.send({ message: 'Карточка была удалена' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные при удалении карточки', ...e });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const cardLikeById = async (req, res) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!like) {
      return res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным ID не найдена' });
    }
    return res.send(like);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка', ...e });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const cardDislikeById = async (req, res) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!dislike) {
      return res.status(NOTFOUND_CODE).send({ message: 'Карточка с указанным ID не найдена' });
    }
    return res.send(dislike);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(DATA_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка', ...e });
    }
    return res.status(SERVER_CODE).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,
};
