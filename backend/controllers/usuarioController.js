const usuarioService = require('../services/usuarioService');
const authService = require('../services/authService');

//buscar todos os usuários
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

//criar um novo usuário
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const emailExistente = await usuarioService.verificarEmailExistente(email);
    if (emailExistente) {
      return res.status(400).json({ error: 'E-mail já em uso.' });
    }

    const nicknameExistente = await usuarioService.verificarNicknameExistente(nickname);
    if (nicknameExistente) {
      return res.status(400).json({ error: 'Nickname já em uso.' });
    }

    const novoUsuario = await usuarioService.criarUsuario({ nome, email, senha, nickname });
    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o usuário', error: error.message });
  }
};

//criar um novo administrador
const createAdmin = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const emailExistente = await usuarioService.verificarEmailExistente(email);
    const nicknameExistente = await usuarioService.verificarNicknameExistente(nickname);

    if (emailExistente || nicknameExistente) {
      const error = emailExistente ? 'E-mail já em uso.' : 'Nickname já em uso.';
      return res.status(400).json({ error });
    }
    
    const admin = await usuarioService.criarAdmin({ nome, email, senha, nickname });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar administrador', error: error.message });
  }
};

//fazer login de um usuário
const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await usuarioService.buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const senhaValida = await usuarioService.verificarSenha(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = authService.gerarToken(usuario);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

//atualizar um usuário existente
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioAtualizado = await usuarioService.atualizarUsuario(id, req.body);

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar o usuário', error: error.message });
  }
};

//deletar um usuário existente
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await usuarioService.deletarUsuario(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o usuário', error: error.message });
  }
};

//pesquisar usuários com base em critérios
const pesquisarUsuarios = async (req, res) => {
  try {
    const { nome, email, nickname } = req.query;

    const usuarios = await usuarioService.pesquisarUsuarios({ nome, email, nickname });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao pesquisar usuários', error: error.message });
  }
};

//atualizar o perfil do usuário logado
const updateMeuPerfil = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.user.id, req.body);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar o perfil', error: error.message });
  }
};

//obter o perfil do usuário logado
const getMeuPerfil = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.user.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
  }
};

module.exports = {
  getAllUsuarios,
  criarUsuario,
  loginUsuario,
  createAdmin,
  updateUsuario,
  deleteUsuario,
  updateMeuPerfil,
  getMeuPerfil,
  pesquisarUsuarios,
};
