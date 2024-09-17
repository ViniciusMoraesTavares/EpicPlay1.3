const jogoService = require('../services/jogoService');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DatabaseError = require('../errors/DatabaseError');

// Obter todos os jogos
const getAllJogos = async (req, res) => {
  try {
    const jogos = await jogoService.getAllJogos();
    res.json(jogos);
  } catch (err) {
    if (err instanceof DatabaseError) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};

// Criar um novo jogo
const createJogo = async (req, res) => {
  try {
    const jogo = await jogoService.createJogo(req.body);
    res.status(201).json(jogo);
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

// Atualizar um jogo existente
const updateJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const jogo = await jogoService.updateJogo(id, req.body);
    if (!jogo) {
      throw new NotFoundError('Jogo não encontrado.');
    }
    res.json(jogo);
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

// Deletar um jogo
const deleteJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await jogoService.deleteJogo(id);
    if (!message) {
      throw new NotFoundError('Jogo não encontrado.');
    }
    res.json(message);
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
  getAllJogos,
  createJogo,
  updateJogo,
  deleteJogo
};
