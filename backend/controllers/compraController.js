const { Compra, Usuario, Jogo } = require('../models');

const { v4: uuidv4 } = require('uuid');
const gerarChaveDeAtivacao = () => uuidv4();

const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll();
    res.json(compras);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar compras.' });
  }
};

const createCompra = async (req, res) => {
  try {
    const { usuario_id, jogo_id } = req.body;

    const usuarioExiste = await Usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      return res.status(400).json({ error: 'O usuário especificado não existe.' });
    }

    const jogoExiste = await Jogo.findByPk(jogo_id);
    if (!jogoExiste) {
      return res.status(400).json({ error: 'O jogo especificado não existe.' });
    }

    const chave_ativacao = gerarChaveDeAtivacao();
    const data_compra = new Date();

    const compra = await Compra.create({ usuario_id, jogo_id, data_compra, chave_ativacao });
    res.status(201).json(compra);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar compra.' });
  }
};

const updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, jogo_id } = req.body;

    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).json({ error: 'Compra não encontrada.' });
    }

    const usuarioExiste = await Usuario.findByPk(usuario_id);
    if (!usuarioExiste) {
      return res.status(400).json({ error: 'O usuário especificado não existe.' });
    }

    const jogoExiste = await Jogo.findByPk(jogo_id);
    if (!jogoExiste) {
      return res.status(400).json({ error: 'O jogo especificado não existe.' });
    }

    compra.usuario_id = usuario_id;
    compra.jogo_id = jogo_id;
    await compra.save();

    res.json(compra);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar compra.' });
  }
};

const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).json({ error: 'Compra não encontrada.' });
    }

    await compra.destroy();
    res.json({ message: 'Compra deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar compra.' });
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  updateCompra,
  deleteCompra
};