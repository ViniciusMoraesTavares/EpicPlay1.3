const { Compra, Usuario, Jogo } = require('../models');
const { v4: uuidv4 } = require('uuid');

const gerarChaveDeAtivacao = () => uuidv4();

const getAllCompras = async () => {
  try {
    return await Compra.findAll();
  } catch (err) {
    throw new Error('Erro ao buscar compras.');
  }
};

const createCompra = async (usuario_id, jogo_id) => {
  try {
    const usuarioExiste = await Usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      throw new Error('O usuário especificado não existe.');
    }

    const jogoExiste = await Jogo.findByPk(jogo_id);
    if (!jogoExiste) {
      throw new Error('O jogo especificado não existe.');
    }

    const chave_ativacao = gerarChaveDeAtivacao();
    const data_compra = new Date();

    return await Compra.create({ usuario_id, jogo_id, data_compra, chave_ativacao });
  } catch (err) {
    throw new Error('Erro ao criar compra: ' + err.message);
  }
};

const updateCompra = async (id, usuario_id, jogo_id) => {
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      throw new Error('Compra não encontrada.');
    }

    const usuarioExiste = await Usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      throw new Error('O usuário especificado não existe.');
    }

    const jogoExiste = await Jogo.findByPk(jogo_id);
    if (!jogoExiste) {
      throw new Error('O jogo especificado não existe.');
    }

    compra.usuario_id = usuario_id;
    compra.jogo_id = jogo_id;
    await compra.save();

    return compra;
  } catch (err) {
    throw new Error('Erro ao atualizar compra: ' + err.message);
  }
};

const deleteCompra = async (id) => {
  try {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      throw new Error('Compra não encontrada.');
    }

    await compra.destroy();
    return { message: 'Compra deletada com sucesso.' };
  } catch (err) {
    throw new Error('Erro ao deletar compra: ' + err.message);
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  updateCompra,
  deleteCompra
};
