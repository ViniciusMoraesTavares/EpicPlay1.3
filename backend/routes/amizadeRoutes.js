const express = require('express');
const router = express.Router();
const amizadeController = require('../controllers/amizadeController');

router.post('/amizade', amizadeController.adicionarAmizade);
router.delete('/amizade/:usuario_id_1/:usuario_id_2', amizadeController.removerAmizade);
router.get('/amizade/:usuario_id/amigos', amizadeController.listarAmigos);

module.exports = router;
