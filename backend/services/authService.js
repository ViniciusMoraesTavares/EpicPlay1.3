const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');
const { buscarUsuarioPorEmail, verificarSenha } = require('./usuarioService');

const loginUsuario = async (email, senha) => {
  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) {
    throw new AuthenticationError('Usuário não encontrado.');
  }

  const senhaValida = await verificarSenha(senha, usuario.senha);
  if (!senhaValida) {
    throw new AuthenticationError('Senha inválida.');
  }

  const token = gerarToken(usuario);

  return token;
};

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

module.exports = { 
  gerarToken,
  loginUsuario,
};
