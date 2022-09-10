const express = require('express');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,

} = require('../controllers/cards');

cardsRoutes.get('/cards', express.json(), getCards);
cardsRoutes.post('/cards', express.json(), createCard);
cardsRoutes.delete('/cards/:cardId', express.json(), deleteCardById);
cardsRoutes.put('/cards/:cardId/likes', express.json(), cardLikeById);
cardsRoutes.delete('/cards/:cardId/likes', express.json(), cardDislikeById);

module.exports = { cardsRoutes };
