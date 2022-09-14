const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = await jwt.verify(token, 'Enigma');
  } catch (err) {
    return res.status(401).send({ message: 'Требуется авторизация' });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
