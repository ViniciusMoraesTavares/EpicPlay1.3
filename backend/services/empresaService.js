const { Empresa } = require('../models');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');

const getAllEmpresas = async () => {
  try {
    return await Empresa.findAll();
  } catch (err) {
    throw new DatabaseError('Erro ao buscar empresas.');
  }
};

const createEmpresa = async (dados) => {
  try {
    return await Empresa.create(dados);
  } catch (err) {
    throw new DatabaseError('Erro ao criar empresa.');
  }
};

const getEmpresaById = async (id) => {
  try {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      throw new NotFoundError('Empresa não encontrada.');
    }
    return empresa;
  } catch (err) {
    throw new DatabaseError('Erro ao buscar empresa.');
  }
};

const updateEmpresa = async (id, dados) => {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      throw new NotFoundError('Empresa não encontrada.');
    }

    await empresa.update(dados);
    return empresa;
  } catch (err) {
    throw new DatabaseError('Erro ao atualizar empresa.');
  }
};

const deleteEmpresa = async (id) => {
  try {
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      throw new NotFoundError('Empresa não encontrada.');
    }

    await empresa.destroy();
    return { message: 'Empresa deletada com sucesso.' };
  } catch (err) {
    console.error("Erro ao deletar empresa:", err);
    throw new DatabaseError('Erro ao deletar empresa.');
  }
};

module.exports = {
  getAllEmpresas,
  getEmpresaById,
  createEmpresa,
  updateEmpresa,
  deleteEmpresa,
};
