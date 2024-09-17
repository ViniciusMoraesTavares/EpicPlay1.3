const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const compraController = require('../controllers/compraController');

router.get('/', authenticate, isAdmin, compraController.getAllCompras);
router.post('/', authenticate, isAdmin, compraController.createCompra);
router.put('/:id', authenticate, isAdmin, compraController.updateCompra);
router.delete('/:id', authenticate, isAdmin, compraController.deleteCompra);

module.exports = router;