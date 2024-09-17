class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400; // dados invalidos ou incompletos 
    }
  }
  
  module.exports = ValidationError;
  