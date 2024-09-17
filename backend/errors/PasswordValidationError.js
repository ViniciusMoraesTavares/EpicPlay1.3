class PasswordValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PasswordValidationError';
      this.statusCode = 400; // dados invalidos ou incompletos 
    }
  }
  
  module.exports = PasswordValidationError;
  