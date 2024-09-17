const compraService = require('../services/compraService');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
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

// Atualizar uma compra existente
const updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, jogo_id } = req.body;
    const compra = await compraService.updateCompra(id, usuario_id, jogo_id);
    if (!compra) {
      throw new NotFoundError('Compra não encontrada.');
    }
    res.json(compra);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

// Deletar uma compra
const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await compraService.deleteCompra(id);
    if (!response) {
      throw new NotFoundError('Compra não encontrada.');
    }
    res.json(response);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  updateCompra,
  deleteCompra
};
