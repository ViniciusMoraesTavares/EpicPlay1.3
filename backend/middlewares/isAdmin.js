function isAdmin(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar.' });
  }

  next();
}

module.exports = isAdmin;
