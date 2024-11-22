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

//Obter jogo especifico
const getJogoById = async (req, res) => {
  const { id } = req.params; 
  try {
    const jogo = await jogoService.getJogoById(id); 
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado.' }); 
    }
    res.json(jogo); 
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
    console.log("Requisição recebida no controller", req.body);
    console.log("Arquivos recebidos:", req.files);

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
  const { id } = req.params;
  const jogoData = req.body;
  const imagePaths = {
    capa: req.files['capa'] ? req.files['capa'][0].path : undefined,
    img_1: req.files['img_1'] ? req.files['img_1'][0].path : undefined,
    img_2: req.files['img_2'] ? req.files['img_2'][0].path : undefined,
    img_3: req.files['img_3'] ? req.files['img_3'][0].path : undefined,
  };

  try {
    const result = await jogoService.updateJogo(id, { ...jogoData, ...imagePaths });
    res.json(result);
  } catch (err) {
    console.error(err); 
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

const uploadImagensJogo = async (req, res) => {
  try {
    const { id } = req.params; 
    const trailerUrl = req.body.trailer; 
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (!youtubeRegex.test(trailerUrl)) {
      return res.status(400).json({ error: 'URL do trailer inválida. Deve ser um link do YouTube.' });
    }

    const imagePaths = {
      capa: req.files['capa'] ? req.files['capa'][0].path : undefined,
      img_1: req.files['img_1'] ? req.files['img_1'][0].path : undefined,
      img_2: req.files['img_2'] ? req.files['img_2'][0].path : undefined,
      img_3: req.files['img_3'] ? req.files['img_3'][0].path : undefined,
    };

    const result = await jogoService.uploadImagensJogo(id, imagePaths, trailerUrl);
    res.json(result);
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
  getJogoById,
  createJogo,
  updateJogo,
  deleteJogo,
  uploadImagensJogo,
};
