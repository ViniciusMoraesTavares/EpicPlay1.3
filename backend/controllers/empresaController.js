const empresaService = require('../services/empresaService');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DatabaseError = require('../errors/DatabaseError');

// Obter todas as empresas
const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await empresaService.getAllEmpresas();
    res.json(empresas);
  } catch (err) {
    if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

// Criar uma nova empresa
const createEmpresa = async (req, res) => {
  try {
    const empresa = await empresaService.createEmpresa(req.body);
    res.status(201).json(empresa);
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

// Atualizar uma empresa existente
const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await empresaService.updateEmpresa(id, req.body);
    if (!empresa) {
      throw new NotFoundError('Empresa não encontrada.');
    }
    res.json(empresa);
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

// Deletar uma empresa
const deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await empresaService.deleteEmpresa(id);
    if (!response) {
      throw new NotFoundError('Empresa não encontrada.');
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
  getAllEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};