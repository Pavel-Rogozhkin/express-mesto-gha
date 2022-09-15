/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');

const auth = async (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = await jwt.verify(token, 'Enigma');
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
