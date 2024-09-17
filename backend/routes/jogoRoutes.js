const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin');
const jogoController = require('../controllers/jogoController');

router.get('/', authenticate, jogoController.getAllJogos);
router.post('/', authenticate, isAdmin, jogoController.createJogo);
router.put('/:id', authenticate, isAdmin, jogoController.updateJogo);
router.delete('/:id', authenticate, isAdmin, jogoController.deleteJogo);

module.exports = router;