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

// Obter uma empresa pelo ID
const getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await empresaService.getEmpresaById(id);
    res.json(empresa);
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

// Criar uma nova empresa
const createEmpresa = async (req, res) => {
  try {
    // Pega a foto do arquivo enviado
    const foto = req.file ? req.file.filename : null; // Se houver foto, obtém o nome do arquivo

    const empresaData = {
      ...req.body,
      foto // Adiciona a foto ao objeto de dados da empresa
    };

    const empresa = await empresaService.createEmpresa(empresaData);
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
    const foto = req.file ? req.file.filename : null; // Pega a nova foto, se houver

    const empresaData = {
      ...req.body,
      ...(foto && { foto }) // Atualiza a foto se houver uma nova
    };

    const empresa = await empresaService.updateEmpresa(id, empresaData);
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
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
};