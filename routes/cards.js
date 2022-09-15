/* eslint-disable import/no-unresolved */
const express = require('express');
const { celebrate, Joi } = require('celebrate');

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
      link: Joi.string().regex(/^(https?:\/\/)?([\w\\.]+)\.([a-z]{2,6}\.?)(\/[\w\\.]*)*\/?$/).required(),
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
