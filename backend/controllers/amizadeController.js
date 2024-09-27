const amizadeService = require('../services/amizadeService');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DatabaseError = require('../errors/DatabaseError');

// Adicionar amizade
const adicionarAmizade = async (req, res) => {
  try {
    const { usuario_id_1, usuario_id_2 } = req.body;
    const amizade = await amizadeService.adicionarAmizade(usuario_id_1, usuario_id_2);
    res.status(201).json(amizade);
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

// Remover amizade
const removerAmizade = async (req, res) => {
  try {
    const { usuario_id_1, usuario_id_2 } = req.params;
    const response = await amizadeService.removerAmizade(usuario_id_1, usuario_id_2);
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

// Listar amigos
const listarAmigos = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const amigos = await amizadeService.listarAmigos(usuario_id);
    res.status(200).json(amigos);
  } catch (err) {
    if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

module.exports = {
  adicionarAmizade,
  removerAmizade,
  listarAmigos
};
