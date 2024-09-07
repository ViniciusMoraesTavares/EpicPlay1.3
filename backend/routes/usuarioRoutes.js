const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { authenticate } = require('../middlewares/authMiddleware');
const usuarioController = require('../controllers/usuarioController');

router.get('/', authenticate, isAdmin, usuarioController.getAllUsuarios);
router.get('/pesquisar', authenticate, usuarioController.pesquisarUsuarios);
router.get('/me', authenticate, usuarioController.getMeuPerfil);
router.post('/', authenticate, isAdmin, usuarioController.createUsuario);
router.post('/criar', usuarioController.criarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/admin', authenticate, isAdmin, usuarioController.createAdmin);
router.put('/:id', authenticate, usuarioController.updateUsuario);
router.put('/me', authenticate, usuarioController.updateMeuPerfil);
router.delete('/:id', authenticate, isAdmin, usuarioController.deleteUsuario);

module.exports = router;
