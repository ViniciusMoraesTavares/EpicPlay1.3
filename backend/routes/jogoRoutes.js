const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); 
const isAdmin = require('../middlewares/isAdmin');
const jogoController = require('../controllers/jogoController');

// Rota para obter todos os jogos
router.get('/', jogoController.getAllJogos);

// Rota para obter jogo específico
router.get('/:id', jogoController.getJogoById);

// Rota para criar um novo jogo (apenas admin)
router.post('/', authenticate, isAdmin, upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'img_1', maxCount: 1 },
    { name: 'img_2', maxCount: 1 },
    { name: 'img_3', maxCount: 1 }
  ]), 
  jogoController.createJogo
);

// Rota para atualizar um jogo existente (apenas admin)
router.put('/:id', authenticate, isAdmin, upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'img_1', maxCount: 1 },
    { name: 'img_2', maxCount: 1 },
    { name: 'img_3', maxCount: 1 }
  ]), 
  jogoController.updateJogo
);

// Rota para deletar um jogo (apenas admin)
router.delete('/:id', authenticate, isAdmin, jogoController.deleteJogo);

module.exports = router;
