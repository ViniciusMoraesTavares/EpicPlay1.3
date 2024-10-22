const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const carrinhoController = require('../controllers/carrinhoController');

router.post('/carrinho', authenticate, carrinhoController.adicionarAoCarrinho);
router.get('/carrinho/:usuario_id', authenticate, carrinhoController.listarCarrinho);
router.delete('/carrinho', authenticate, carrinhoController.removerDoCarrinho);

module.exports = router;
