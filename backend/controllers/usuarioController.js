const { Usuario } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'role']
    });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: { email }
    });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já em uso.' });
    }

    const nicknameExistente = await Usuario.findOne({
      where: { nickname }
    });
    if (nicknameExistente) {
      return res.status(400).json({ error: 'Nickname já em uso.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      nickname
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o usuário', error: error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { email, nickname, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email },
          { nickname }
        ]
      }
    });

    if (usuarioExistente) {
      if (usuarioExistente.email === email) {
        return res.status(400).json({ error: 'Já existe um usuário com esse email.' });
      }
      if (usuarioExistente.nickname === nickname) {
        return res.status(400).json({ erro: 'Já existe um usuário com esse nick' });
      }
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      ...req.body,
      senha: hashedPassword,
      role: 'user'
    });

    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const adminExistente = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email },
          { nickname }
        ]
      }
    });

    if (adminExistente) {
      if (adminExistente.email === email) {
        return res.status(400).json({ error: 'Já existe um administrador com esse email.' });
      }
      if (adminExistente.nickname === nickname) {
        return res.status(400).json({ error: 'Já existe um administrador com esse nick.' });
      }
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const admin = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      nickname,
      role: 'admin'
    });

    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar administrador' });
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

const pesquisarUsuarios = async (req, res) => {
  try {
    const { nome, email, nickname } = req.query;

    const whereConditions = {};
    if (nome) whereConditions.nome = { [Op.iLike]: `%${nome}%` };
    if (email) whereConditions.email = { [Op.iLike]: `%${email}%` };
    if (nickname) whereConditions.nickname = { [Op.iLike]: `%${nickname}%` };

    const usuarios = await Usuario.findAll({
      where: whereConditions,
      attributes: ['id', 'nome', 'email', 'nickname', 'role']
    });

    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao pesquisar usuários.' });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      'seu-segredo-aqui', // Substituir dps
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

const updateMeuPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar perfil.' });
  }
};

const getMeuPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
};


module.exports = {
  getAllUsuarios,
  criarUsuario,
  createUsuario,
  createAdmin,
  loginUsuario,
  updateUsuario,
  pesquisarUsuarios,
  deleteUsuario,
  updateMeuPerfil,
  getMeuPerfil,
};
