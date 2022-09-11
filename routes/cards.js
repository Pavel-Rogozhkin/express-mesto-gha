const express = require('express');

const {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);
cardsRoutes.post('/cards', createCard);
cardsRoutes.delete('/cards/:cardId', deleteCardById);
cardsRoutes.put('/cards/:cardId/likes', cardLikeById);
cardsRoutes.delete('/cards/:cardId/likes', cardDislikeById);

module.exports = { cardsRoutes };
