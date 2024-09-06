const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const empresaController = require('../controllers/empresaController');

router.get('/', empresaController.getAllEmpresas);
router.post('/', isAdmin, empresaController.createEmpresa);
router.put('/:id', isAdmin, empresaController.updateEmpresa);
router.delete('/:id', isAdmin, empresaController.deleteEmpresa);

module.exports = router;