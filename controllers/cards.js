const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (e) {
    return res.status(500).send({ message: 'Возникла ошибка на сервере', ...e });
  }
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
