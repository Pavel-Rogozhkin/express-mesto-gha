const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { regexValidUrl } = require('../utils/consts');

const {
  getCards,
  createCard,
  deleteCardById,
  cardLikeById,
  cardDislikeById,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);
cardsRoutes.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().regex(regexValidUrl).required(),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).alphanum(),
    }),
  }),
  deleteCardById,
);

cardsRoutes.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).alphanum(),
    }),
  }),
  cardLikeById,
);

cardsRoutes.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).alphanum(),
    }),
  }),
  cardDislikeById,
);

module.exports = { cardsRoutes };
