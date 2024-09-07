const jwt = require('jsonwebtoken');

function gerarToken(usuario) {
  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role 
  };

  const secret = process.env.JWT_SECRET; 

  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 

  return token;
}

module.exports = { gerarToken };
