class LoginError extends Error {
    constructor(message) {
      super(message);
      this.name = 'LoginError';
      this.statusCode = 401; // não autorizado
    }
  }
  
  module.exports = LoginError;
  