const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const empresaController = require('../controllers/empresaController');
const upload = require('../middlewares/upload'); 

router.get('/', authenticate, empresaController.getAllEmpresas);
router.post('/', authenticate, isAdmin, upload.single('foto'), empresaController.createEmpresa); 
router.put('/:id', authenticate, isAdmin, upload.single('foto'), empresaController.updateEmpresa); 
router.delete('/:id', authenticate, isAdmin, empresaController.deleteEmpresa);

module.exports = router;
