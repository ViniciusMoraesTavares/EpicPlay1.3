const AppError = require('./AppError');

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = AuthenticationError;
