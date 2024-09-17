class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthorizationError';
      this.statusCode = 403; // servidor entendeu a solicitação, mas não autorizou o acesso
    }
  }
  
  module.exports = AuthorizationError;
  