const { Compra, Usuario, Jogo } = require('../models');
const { v4: uuidv4 } = require('uuid');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// Gerar chave de ativação
const gerarChaveDeAtivacao = () => uuidv4();

// Obter todas as compras
const getAllCompras = async () => {
  try {
    return await Compra.findAll();
  } catch (err) {
    throw new DatabaseError('Erro ao buscar compras.');
  }
};

// Criar uma nova compra
const createCompra = async (usuario_id, jogo_id) => {
  try {
    const usuarioExiste = await Usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      throw new ValidationError('O usuário especificado não existe.');
    }

    const jogoExiste = await Jogo.findByPk(jogo_id);
    if (!jogoExiste) {
      throw new ValidationError('O jogo especificado não existe.');
    }

    const chave_ativacao = gerarChaveDeAtivacao();
    const data_compra = new Date();
    data_compra.setHours(data_compra.getHours() - 3);

    return await Compra.create({ usuario_id, jogo_id, data_compra, chave_ativacao });
  } catch (err) {
    throw new DatabaseError('Erro ao criar compra: ' + err.message);
  }
};


// Obter compra por ID
const getCompraById = async (id) => {
  try {
    const compra = await Compra.findByPk(id, {
      include: ['jogo', 'usuario'], // Incluir dados do jogo e usuário
    });
    if (!compra) {
      throw new NotFoundError('Compra não encontrada.');
    }
    return compra;
  } catch (err) {
    throw new DatabaseError('Erro ao buscar compra por ID: ' + err.message);
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  getCompraById,
};
