const { Empresa } = require('../models');

const getAllEmpresas = async () => {
  try {
    return await Empresa.findAll();
  } catch (err) {
    throw new Error('Erro ao buscar empresas.');
  }
};

const createEmpresa = async (dados) => {
  try {
    return await Empresa.create(dados);
  } catch (err) {
    throw new Error('Erro ao criar empresa.');
  }
};

const updateEmpresa = async (id, dados) => {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      throw new Error('Empresa não encontrada.');
    }

    await empresa.update(dados);
    return empresa;
  } catch (err) {
    throw new Error('Erro ao atualizar empresa.');
  }
};

const deleteEmpresa = async (id) => {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      throw new Error('Empresa não encontrada.');
    }

    await empresa.destroy();
    return { message: 'Empresa deletada com sucesso.' };
  } catch (err) {
    throw new Error('Erro ao deletar empresa.');
  }
};

module.exports = {
  getAllEmpresas,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa
};
