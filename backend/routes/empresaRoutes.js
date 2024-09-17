const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const empresaController = require('../controllers/empresaController');

router.get('/', authenticate, empresaController.getAllEmpresas);
router.post('/', authenticate, isAdmin, empresaController.createEmpresa);
router.put('/:id', authenticate, isAdmin, empresaController.updateEmpresa);
router.delete('/:id', authenticate, isAdmin, empresaController.deleteEmpresa);

module.exports = router;