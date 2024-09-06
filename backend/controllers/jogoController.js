const { Jogo, Empresa } = require('../models');


const getAllJogos = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar jogos.' });
  }
};

const createJogo = async (req, res) => {
  try {
    const { empresa_id } = req.body;

    const empresa = await Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(400).json({ error: 'A empresa associada não existe.' });
    }

    const jogo = await Jogo.create(req.body);
    res.status(201).json(jogo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar jogo.' });
  }
};

const updateJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const jogo = await Jogo.findByPk(id);

    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    const { empresa_id } = req.body;
    if (empresa_id) {
      const empresa = await Empresa.findByPk(empresa_id);
      if (!empresa) {
        return res.status(400).json({ error: 'A empresa associada não existe.' });
      }
    }

    await jogo.update(req.body);
    res.json(jogo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar jogo.' });
  }
};

const deleteJogo = async (req, res) => {
  try {
    const { id } = req.params;
    const jogo = await Jogo.findByPk(id);

    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    await jogo.destroy();
    res.json({ message: 'Jogo deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar jogo.' });
  }
};

module.exports = {
  getAllJogos,
  createJogo,
  updateJogo,
  deleteJogo
};
