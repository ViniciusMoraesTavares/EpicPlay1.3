const { Usuario, Compra, Jogo, Amizade} = require('../models');const bcrypt = require('bcryptjs');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const criarUsuario = async ({ nome, email, senha, nickname, foto }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'user', foto });
  } catch (err) {
    throw new DatabaseError('Erro ao criar usuário: ' + err.message);
  }
};

const criarAdmin = async ({ nome, email, senha, nickname, foto }) => {
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    return await Usuario.create({ nome, email, senha: hashedSenha, nickname, role: 'admin', foto });
  } catch (err) {
    throw new DatabaseError('Erro ao criar administrador: ' + err.message);
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

const verificarSenha = async (senha, senhaHash) => {
  try {
    console.log('Verificando a senha...');  
    const isMatch = await bcrypt.compare(senha, senhaHash);
    console.log('Senha válida:', isMatch);  
    return isMatch;
  } catch (error) {
    console.error('Erro ao verificar a senha:', error);  
    throw new DatabaseError('Erro ao verificar a senha: ' + error.message);
  }
};

const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    console.log('Usuário encontrado:', usuario);  
    return usuario;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);  
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

    // Atualiza a foto se fornecida
    if (dadosAtualizados.foto) {
      dadosAtualizados.foto = dadosAtualizados.foto;
    }

    await usuario.update(dadosAtualizados);
    return usuario;
  } catch (error) {
    throw new DatabaseError('Erro ao atualizar o usuário: ' + error.message);
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

const pesquisarUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findByPk(id, {
      attributes: ['nome', 'nickname', 'role', 'email'],
      include: [
        {
          model: Compra,
          attributes: ['jogo_id', 'data_compra'],
          include: [
            {
              model: Jogo, 
              attributes: ['nome']
            }
          ],
          order: [['data_compra', 'DESC']],
          limit: 1 // Para pegar apenas o último jogo comprado
        },
      ]
    });

    if (!usuario) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    // Adiciona o último jogo comprado, se existir
    const ultimoJogo = usuario.Compras.length > 0 ? usuario.Compras[0].Jogo : null;

    const resultado = {
      nome: usuario.nome,
      nickname: usuario.nickname,
      role: usuario.role,
      email: usuario.email,
      jogos: usuario.Compras.map(compra => compra.Jogo.nome), // Lista de nomes dos jogos
      ultimoJogo: ultimoJogo ? ultimoJogo.nome : null, // Nome do último jogo
    };

    return resultado;

  } catch (error) {
    throw new DatabaseError('Erro ao buscar o usuário por ID: ' + error.message);
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
  promoverUsuario,
  buscarTodosUsuarios,
  pesquisarUsuarioPorId,
  buscarUsuarioPorId,
};