const { Amizade, Usuario } = require('../models');
const DatabaseError = require('../errors/DatabaseError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

// Adicionar amizade
const adicionarAmizade = async (usuario_id_1, usuario_id_2) => {
  try {
    if (usuario_id_1 === usuario_id_2) {
      throw new ValidationError('Você não pode seguir a si mesmo.');
    }

    const amizadeExistente = await Amizade.findOne({
      where: { usuario_id_1, usuario_id_2 }
    });

    if (amizadeExistente) {
      throw new ValidationError('Amizade já existente.');
    }

    return await Amizade.create({ usuario_id_1, usuario_id_2 });
  } catch (err) {
    throw new DatabaseError('Erro ao criar amizade: ' + err.message);
  }
};

// Remover amizade
const removerAmizade = async (usuario_id_1, usuario_id_2) => {
  try {
    const amizade = await Amizade.findOne({
      where: { usuario_id_1, usuario_id_2 }
    });

    if (!amizade) {
      throw new NotFoundError('Amizade não encontrada.');
    }

    await amizade.destroy();
    return { message: 'Amizade removida com sucesso.' };
  } catch (err) {
    throw new DatabaseError('Erro ao remover amizade: ' + err.message);
  }
};

// Listar amigos
const listarAmigos = async (usuario_id) => {
  try {
    return await Amizade.findAll({
      where: { usuario_id_1: usuario_id },
      include: [{ model: Usuario, as: 'amigos', attributes: ['id', 'nome'] }]
    });
  } catch (err) {
    throw new DatabaseError('Erro ao listar amigos: ' + err.message);
  }
};

module.exports = {
  adicionarAmizade,
  removerAmizade,
  listarAmigos
};