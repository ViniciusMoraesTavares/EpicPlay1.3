const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', authenticate, carrinhoController.adicionarAoCarrinho);
router.get('/:usuario_id', authenticate, carrinhoController.listarCarrinho);
router.delete('/', authenticate, carrinhoController.removerDoCarrinho);

module.exports = router;
