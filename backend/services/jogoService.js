const { Jogo, Empresa } = require('../models');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');

const getAllJogos = async () => {
  try {
    return await Jogo.findAll();
  } catch (err) {
    throw new DatabaseError('Erro ao buscar jogos.');
  }
};

const createJogo = async (jogoData) => {
  try {
    const { empresa_id } = jogoData;
    const empresa = await Empresa.findByPk(empresa_id);

    if (!empresa) {
      throw new NotFoundError('A empresa associada não existe.');
    }

    return await Jogo.create(jogoData);
  } catch (err) {
    throw new DatabaseError('Erro ao criar jogo: ' + err.message);
  }
};

const updateJogo = async (id, jogoData) => {
  try {
    const jogo = await Jogo.findByPk(id);

    if (!jogo) {
      throw new NotFoundError('Jogo não encontrado.');
    }

    const { empresa_id } = jogoData;
    if (empresa_id) {
      const empresa = await Empresa.findByPk(empresa_id);
      if (!empresa) {
        throw new NotFoundError('A empresa associada não existe.');
      }
    }

    await jogo.update(jogoData);
    return jogo;
  } catch (err) {
    throw new DatabaseError('Erro ao atualizar jogo: ' + err.message);
  }
};

const deleteJogo = async (id) => {
  try {
    const jogo = await Jogo.findByPk(id);

    if (!jogo) {
      throw new NotFoundError('Jogo não encontrado.');
    }

    await jogo.destroy();
    return { message: 'Jogo deletado com sucesso.' };
  } catch (err) {
    throw new DatabaseError('Erro ao deletar jogo: ' + err.message);
  }
};

module.exports = {
  getAllJogos,
  createJogo,
  updateJogo,
  deleteJogo
};
