const compraService = require('../services/compraService');

const getAllCompras = async (req, res) => {
  try {
    const compras = await compraService.getAllCompras();
    res.json(compras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCompra = async (req, res) => {
  try {
    const { usuario_id, jogo_id } = req.body;
    const compra = await compraService.createCompra(usuario_id, jogo_id);
    res.status(201).json(compra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, jogo_id } = req.body;
    const compra = await compraService.updateCompra(id, usuario_id, jogo_id);
    res.json(compra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await compraService.deleteCompra(id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCompras,
  createCompra,
  updateCompra,
  deleteCompra
};
