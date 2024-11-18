const compraService = require('../services/compraService');
const ValidationError = require('../errors/ValidationError');
const DatabaseError = require('../errors/DatabaseError');

// Obter todas as compras
const getAllCompras = async (req, res) => {
  try {
    const compras = await compraService.getAllCompras();
    res.json(compras);
  } catch (err) {
    if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

// Criar uma nova compra
const createCompra = async (req, res) => {
  try {
    const { usuario_id, jogo_id } = req.body;
    const compra = await compraService.createCompra(usuario_id, jogo_id);
    res.status(201).json(compra);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

// Obter compra por ID
const getCompraById = async (req, res) => {
  const compraId = req.params.id;
  try {
    const compra = await compraService.getCompraById(compraId);
    if (compra) {
      res.status(200).json(compra);
    } else {
      res.status(404).json({ error: 'Compra não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  getCompraById,
};
