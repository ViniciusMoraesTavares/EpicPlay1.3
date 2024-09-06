const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.post('/', isAdmin, usuarioController.createUsuario);
router.post('/admin', isAdmin, usuarioController.createAdmin);
router.put('/:id', isAdmin, usuarioController.updateUsuario);
router.delete('/:id', isAdmin, usuarioController.deleteUsuario);

module.exports = router;
