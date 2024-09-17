const AppError = require('./AppError');
const AuthenticationError = require('./AuthenticationError');
const AuthorizationError = require('./AuthorizationError');
const DatabaseError = require('./DatabaseError');
const NotFoundError = require('./NotFoundError');
const PasswordValidationError = require('./PasswordValidationError');
const ValidationError = require('./ValidationError');
const LoginError = require('./LoginError');

module.exports = {
  AppError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  NotFoundError,
  PasswordValidationError,
  ValidationError,
  LoginError,
};
