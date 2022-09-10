const Card = require('../models/card');

const getCards = (req, res) => {
  res.send(req.body);
};

const createCard = (req, res) => {
  const card = new Card({ owner: req.user._id, ...req.body }).save();
  return res.status(200).send(card);
};

const deleteCardById = (req, res) => {
  res.send(req.body);
};

const cardLikeById = (req, res) => {
  const like = Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  return res.status(200).send(like);
};

const cardDislikeById = (req, res) => {
  const dislike = Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
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
