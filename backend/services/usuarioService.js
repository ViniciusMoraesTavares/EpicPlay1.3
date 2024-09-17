const { Usuario, Compra, Jogo} = require('../models');const bcrypt = require('bcryptjs');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const criarUsuario = async ({ nome, email, senha, nickname }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'user' });
  } catch (err) {
    throw new DatabaseError('Erro ao criar usuário: ' + err.message);
  }
};

const criarAdmin = async ({ nome, email, senha, nickname }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'admin' });
  } catch (err) {
    throw new DatabaseError('Erro ao criar administrador: ' + err.message);
  }
};

const verificarSenha = async (senha, senhaHash) => {
  try {
    return await bcrypt.compare(senha, senhaHash);
  } catch (error) {
    throw new DatabaseError('Erro ao verificar a senha: ' + error.message);
  }
};

const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return usuario;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar o usuário: ' + error.message);
  }
};

const verificarEmailExistente = async (email) => {
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    return !!usuarioExistente;
  } catch (error) {
    throw new DatabaseError('Erro ao verificar o email: ' + error.message);
  }
};

const verificarNicknameExistente = async (nickname) => {
  try {
    const nicknameExistente = await Usuario.findOne({ where: { nickname } });
    return !!nicknameExistente;
  } catch (error) {
    throw new DatabaseError('Erro ao verificar o nickname: ' + error.message);
  }
};

const atualizarUsuario = async (idUsuario, dadosAtualizados, usuarioAutenticado) => {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (usuario.role === 'admin' && usuarioAutenticado.id !== usuario.id) {
      throw new AuthorizationError('Somente o próprio administrador pode alterar suas informações.');
    }

    if (dadosAtualizados.role && usuario.role === 'admin' && dadosAtualizados.role !== 'admin') {
      throw new AuthorizationError('Não é permitido rebaixar um administrador.');
    }

    if (dadosAtualizados.senha) {
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10);
    }

    await usuario.update(dadosAtualizados);
    return usuario;
  } catch (error) {
    throw new DatabaseError('Erro ao atualizar o usuário: ' + error.message);
  }
};

const deletarUsuario = async (id, usuarioAutenticado) => {
  try {
    const usuarioAlvo = await Usuario.findByPk(id);
    if (!usuarioAlvo) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (usuarioAlvo.role === 'admin' && usuarioAutenticado.id !== usuarioAlvo.id) {
      throw new AuthorizationError('Não é permitido excluir outro administrador.');
    }

    await Compra.destroy({ where: { usuario_id: id } });
    await usuarioAlvo.destroy();
    return usuarioAlvo;
  } catch (error) {
    throw new DatabaseError('Erro ao deletar o usuário: ' + error.message);
  }
};

const promoverUsuario = async (id, usuarioAutenticado) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (usuario.role === 'admin') {
      throw new AuthorizationError('Usuário já é um administrador.');
    }

    if (usuarioAutenticado.role !== 'admin') {
      throw new AuthorizationError('Somente administradores podem promover usuários.');
    }

    usuario.role = 'admin';
    await usuario.save();
    return usuario;
  } catch (error) {
    throw new DatabaseError('Erro ao promover o usuário: ' + error.message);
  }
};

const buscarTodosUsuarios = async () => {
  try {
    return await Usuario.findAll();
  } catch (error) {
    throw new DatabaseError('Erro ao buscar todos os usuários: ' + error.message);
  }
};

const buscarUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return usuario;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar usuário por ID: ' + error.message);
  }
};

const pesquisarUsuarios = async() => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['nome', 'nickname']
    });

    return usuarios;

  } catch (error) {
    throw new Error('Erro ao buscar usuários.');
  }
}



module.exports = {
  criarUsuario,
  criarAdmin,
  verificarSenha,
  buscarUsuarioPorEmail,
  verificarEmailExistente,
  verificarNicknameExistente,
  atualizarUsuario,
  deletarUsuario,
  promoverUsuario,
  buscarTodosUsuarios,
  buscarUsuarioPorId,
  pesquisarUsuarios,
};
