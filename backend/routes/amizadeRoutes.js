const express = require('express');
const router = express.Router();
const amizadeController = require('../controllers/amizadeController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/amizade', authenticate, amizadeController.adicionarAmizade);
router.delete('/amizade/:usuario_id_1/:usuario_id_2', authenticate, amizadeController.removerAmizade);
router.get('/amizade/:usuario_id/amigos', authenticate, amizadeController.listarAmigos);

module.exports = router;
