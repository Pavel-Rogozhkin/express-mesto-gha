// errors/req-err.js

class ReqError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { ReqError };
