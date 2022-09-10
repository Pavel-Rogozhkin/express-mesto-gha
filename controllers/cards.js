const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await new Card({
      owner: req.user._id,
      ...req.body,
    }).save();
    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res.status(404).send({ message: 'Карточка с указанным ID не найдена' });
    }
    return res.status(200).send({ message: 'Карточка была удалена' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
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
      return res.status(404).send({ message: 'Карточка с указанным ID не найдена' });
    }
    return res.status(200).send(like);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка', ...e });
    }
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
};

const cardDislikeById = (req, res) => {
  const dislike = Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  return res.status(200).send(dislike);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,
};
