const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const compraController = require('../controllers/compraController');

// Obter todas as compras
router.get('/', authenticate, compraController.getAllCompras);

// Criar uma nova compra
router.post('/', authenticate, compraController.createCompra);

// Obter compra por ID
router.get('/:id', authenticate, compraController.getCompraById);

module.exports = router;
