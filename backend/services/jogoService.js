const { Jogo, Empresa } = require('../models');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// Obter todos os jogos
const getAllJogos = async () => {
  try {
    return await Jogo.findAll();
  } catch (err) {
    throw new DatabaseError('Erro ao buscar jogos.');
  }
};

// Obter jogo especifico
const getJogoById = async (id) => {
  const jogo = await Jogo.findOne({ where: { id } });
  return jogo;
};

// Criar um novo jogo
const createJogo = async (jogoData) => {
  try {
    const { empresa_id, nome, preco } = jogoData;

    // Validações básicas
    if (!nome || !preco) {
      throw new ValidationError('Nome e preço são obrigatórios.');
    }

    const empresa = await Empresa.findByPk(empresa_id);
    if (!empresa) {
      throw new NotFoundError('A empresa associada não existe.');
    }

    const novoJogo = await Jogo.create(jogoData);
    return { message: 'Jogo criado com sucesso!', jogo: novoJogo };
  } catch (err) {
    throw new DatabaseError('Erro ao criar jogo: ' + err.message);
  }
};

// Atualizar um jogo existente
const updateJogo = async (id, jogoData) => {
  try {
    const jogo = await Jogo.findByPk(id);
    if (!jogo) {
      throw new NotFoundError('Jogo não encontrado.');
    }

    // Atualiza o jogo com os dados recebidos
    await jogo.update(jogoData);

    return { message: 'Jogo atualizado com sucesso!', jogo };
  } catch (err) {
    throw new DatabaseError('Erro ao atualizar jogo: ' + err.message);
  }
};



// Deletar um jogo
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

// Fazer upload de imagens e trailer
const uploadImagensJogo = async (jogoId, imagePaths, trailerUrl) => {
  try {
    const jogo = await Jogo.findByPk(jogoId);
    if (!jogo) {
      throw new NotFoundError('Jogo não encontrado.');
    }

    const { capa, img_1, img_2, img_3 } = imagePaths;

    await Jogo.update(
      { capa, img_1, img_2, img_3, trailer: trailerUrl },
      { where: { id: jogoId } }
    );

    return { message: 'Imagens e trailer salvos com sucesso!', imagePaths, trailerUrl };
  } catch (err) {
    throw new DatabaseError('Erro ao salvar as imagens/trailer: ' + err.message);
  }
};

module.exports = {
  getAllJogos,
  getJogoById,
  createJogo,
  updateJogo,
  deleteJogo,
  uploadImagensJogo,
};
