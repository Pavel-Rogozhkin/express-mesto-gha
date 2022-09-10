const express = require('express');

const cardsRoutes = express.Router();

const {
  getCards,
  createCard,
  deleteCardById,
} = require('../controllers/cards');

cardsRoutes.get('/cards', express.json(), getCards);
cardsRoutes.post('/cards', express.json(), createCard);
cardsRoutes.delete('/cards/:cardId', express.json(), deleteCardById);

module.exports = { cardsRoutes };
