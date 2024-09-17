const AuthorizationError = require('../errors/AuthorizationError');

function isAdmin(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: new AuthorizationError('Usuário não autenticado.').message });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ error: new AuthorizationError('Acesso negado. Apenas administradores podem acessar.').message });
  }

  next();
}

module.exports = isAdmin;
