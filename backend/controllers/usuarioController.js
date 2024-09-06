const { Usuario } = require('../models');

exports.atualizarRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Permissão inválido.' });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (usuario.role === 'admin' && role === 'user') {
      return res.status(403).json({ error: 'Você não pode rebaixar um admin para usuário.' });
    }

    usuario.role = role;
    await usuario.save();

    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar permissão.' });
  }
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email'] 
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar usuário.' });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};

module.exports = {
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
