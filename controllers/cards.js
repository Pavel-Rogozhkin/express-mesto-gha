const Card = require('../models/card');

const { NotFoundError } = require('../errors/not-found-err');
const { ReqError } = require('../errors/req-err');
// const { ForbError } = require('../errors/forb-err');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next();
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = await new Card({
      owner: req.user._id,
      name: req.body.name,
      link: req.body.link,
    }).save();
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ReqError('Переданы некорректные данные при создании карточки'));
    }
    return next();
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new NotFoundError('Карточка с указанным ID не найдена'));
    }
    // const cardUser = card.owner._id.toString();
    // if (cardUser === req.user._id) {
    //   await Card.findByIdAndDelete(cardId);
    // } else {
    //   return next(new ForbError('Попытка удалить карточку другого пользователя'));
    // }
    return res.send({ message: 'Карточка была удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ReqError('Переданы некорректные данные при удалении карточки'));
    }
    return next();
  }
};

const cardLikeById = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!like) {
      return next(new NotFoundError('Карточка с указанным ID не найдена'));
    }
    return res.send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ReqError('Переданы некорректные данные для постановки/снятии лайка'));
    }
    return next();
  }
};

const cardDislikeById = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!dislike) {
      return next(new NotFoundError('Карточка с указанным ID не найдена'));
    }
    return res.send(dislike);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ReqError('Переданы некорректные данные для постановки/снятии лайка'));
    }
    return next();
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,
};
