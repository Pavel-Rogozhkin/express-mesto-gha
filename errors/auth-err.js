// errors/auth-err.js

class AutorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AutorizationError;
