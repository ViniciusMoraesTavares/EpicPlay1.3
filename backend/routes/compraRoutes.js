const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const compraController = require('../controllers/compraController');

router.get('/', compraController.getAllCompras);
router.post('/', isAdmin, compraController.createCompra);
router.put('/:id', isAdmin, compraController.updateCompra);
router.delete('/:id', isAdmin, compraController.deleteCompra);

module.exports = router;