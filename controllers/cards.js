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

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};
