const { Usuario, Compra } = require('../models');
const bcrypt = require('bcryptjs');

// criar um novo usuário
const criarUsuario = async ({ nome, email, senha, nickname }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'user' });
  } catch (err) {
    throw new Error('Erro ao criar usuário: ' + err.message);
  }
};

const criarAdmin = async ({ nome, email, senha, nickname }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'admin' });
  } catch (err) {
    throw new Error('Erro ao criar administrador: ' + err.message);
  }
};

// verificar a senha fornecida como a senha salva no banco
const verificarSenha = async (senha, senhaHash) => {
  try {
    return await bcrypt.compare(senha, senhaHash);
  } catch (error) {
    console.error("Erro ao verificar senha:", error);
    throw new Error('Erro ao verificar a senha');
  }
};

// buscar usuário por email
const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }
    return usuario;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    throw new Error('Erro ao buscar o usuário');
  }
};

// verificar se o emailestá cadastrado
const verificarEmailExistente = async (email) => {
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    return !!usuarioExistente;
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    throw new Error('Erro ao verificar o email');
  }
};

// verificar se o nickname  está cadastrado
const verificarNicknameExistente = async (nickname) => {
  try {
    const nicknameExistente = await Usuario.findOne({ where: { nickname } });
    return !!nicknameExistente; 
  } catch (error) {
    console.error("Erro ao verificar nickname:", error);
    throw new Error('Erro ao verificar o nickname');
  }
};

// atualizar o perfil do usuário 
const atualizarUsuario = async (idUsuario, dadosAtualizados) => {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    if (dadosAtualizados.senha) {
      dadosAtualizados.senha = await bcrypt.hash(dadosAtualizados.senha, 10);
    }

    await usuario.update(dadosAtualizados);
    return usuario;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error('Erro ao atualizar o usuário');
  }
};

const deletarUsuario = async (id) => {
  try {
    await Compra.destroy({ where: { usuario_id: id } });

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    await usuario.destroy();
    return usuario;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw new Error('Erro ao deletar o usuário');
  }
};

module.exports = {
  criarUsuario,
  criarAdmin,
  verificarSenha,
  buscarUsuarioPorEmail,
  verificarEmailExistente,
  verificarNicknameExistente,
  atualizarUsuario,
  deletarUsuario
};
