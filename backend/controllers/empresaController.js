const { Empresa } = require('../models');

const getAllEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll();
    res.json(empresas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar empresas.' });
  }
};

const createEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.create(req.body);
    res.status(201).json(empresa);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar empresa.' });
  }
};

const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    await empresa.update(req.body);
    res.json(empresa);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar empresa.' });
  }
};

const deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }

    await empresa.destroy();
    res.json({ message: 'Empresa deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar empresa.' });
  }
};

module.exports = {
  getAllEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};
