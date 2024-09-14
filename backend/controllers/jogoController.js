const jogoService = require('../services/jogoService');

const getAllJogos = async (req, res) => {
  try {
    const jogos = await jogoService.getAllJogos();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createJogo = async (req, res) => {
  try {
    const jogo = await jogoService.createJogo(req.body);
    res.status(201).json(jogo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const jogo = await jogoService.updateJogo(id, req.body);
    res.json(jogo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await jogoService.deleteJogo(id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJogos,
  createJogo,
  updateJogo,
  deleteJogo
};
