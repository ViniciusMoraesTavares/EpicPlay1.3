const usuarioService = require('../services/usuarioService');
const authService = require('../services/authService');
const AuthorizationError = require('../errors/AuthorizationError');
const LoginError = require('../errors/LoginError');
const PasswordValidationError = require('../errors/PasswordValidationError');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// Buscar todos os usuários
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.buscarTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao buscar usuários no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Criar um novo usuário
const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const emailExistente = await usuarioService.verificarEmailExistente(email);
    if (emailExistente) {
      throw new ValidationError('E-mail já em uso.');
    }

    const nicknameExistente = await usuarioService.verificarNicknameExistente(nickname);
    if (nicknameExistente) {
      throw new ValidationError('Nickname já em uso.');
    }

    const novoUsuario = await usuarioService.criarUsuario({ nome, email, senha, nickname });
    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao criar o usuário no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Criar um novo administrador
const createAdmin = async (req, res) => {
  try {
    const { nome, email, senha, nickname } = req.body;

    const emailExistente = await usuarioService.verificarEmailExistente(email);
    const nicknameExistente = await usuarioService.verificarNicknameExistente(nickname);

    if (emailExistente || nicknameExistente) {
      const error = emailExistente ? 'E-mail já em uso.' : 'Nickname já em uso.';
      throw new ValidationError(error);
    }

    const admin = await usuarioService.criarAdmin({ nome, email, senha, nickname });
    res.status(201).json(admin);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao criar administrador no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Fazer login de um usuário
const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await usuarioService.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new LoginError('Usuário não encontrado.');
    }

    const senhaValida = await usuarioService.verificarSenha(senha, usuario.senha);
    if (!senhaValida) {
      throw new PasswordValidationError('Senha inválida.');
    }

    const token = authService.gerarToken(usuario);
    res.json({ token });
  } catch (error) {
    if (error instanceof LoginError || error instanceof PasswordValidationError) {
      res.status(401).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao buscar usuário ou verificar senha no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Atualizar um usuário existente
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioAutenticado = req.user; // Usuário autenticado
    const usuarioAtualizado = await usuarioService.atualizarUsuario(id, req.body, usuarioAutenticado);

    if (!usuarioAtualizado) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    res.json(usuarioAtualizado);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao atualizar o usuário no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Deletar um usuário existente
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await usuarioService.deletarUsuario(id);

    if (!usuarioDeletado) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao deletar o usuário no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Deletar o próprio perfil
const deleteMeuPerfil = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const usuarioDeletado = await usuarioService.deletarUsuario(usuarioId);

    res.json({ message: 'Perfil deletado com sucesso.' });
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao deletar o perfil no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Pesquisar usuários com base em critérios
const pesquisarUsuarios = async (req, res) => {
  try {
    const { nome, nickname } = req.query;

    const usuarios = await usuarioService.pesquisarUsuarios({ nome, nickname });
    res.json(usuarios);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao pesquisar usuários no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Atualizar o perfil do usuário logado
const updateMeuPerfil = async (req, res) => {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.user.id, req.body);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    res.json(usuario);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao atualizar o perfil no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Obter o perfil do usuário logado
const getMeuPerfil = async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.user.id);
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    res.json(usuario);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao buscar perfil no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};

// Promover um usuário para administrador
const promoverUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioAutenticado = req.user; // Usuário autenticado
    
    const usuarioPromovido = await usuarioService.promoverUsuario(id, usuarioAutenticado);

    res.json(usuarioPromovido);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof AuthorizationError) {
      res.status(403).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(500).json({ error: 'Erro ao promover o usuário no banco de dados.' });
    } else {
      res.status(500).json({ error: 'Erro inesperado.' });
    }
  }
};


module.exports = {
  getAllUsuarios,
  criarUsuario,
  createAdmin,
  loginUsuario,
  updateUsuario,
  deleteUsuario,
  deleteMeuPerfil,
  pesquisarUsuarios,
  updateMeuPerfil,
  getMeuPerfil,
  promoverUsuario,
};
