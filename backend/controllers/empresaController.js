const empresaService = require('../services/empresaService');

const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await empresaService.getAllEmpresas();
    res.json(empresas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmpresa = async (req, res) => {
  try {
    const empresa = await empresaService.createEmpresa(req.body);
    res.status(201).json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await empresaService.updateEmpresa(id, req.body);
    res.json(empresa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await empresaService.deleteEmpresa(id);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};
