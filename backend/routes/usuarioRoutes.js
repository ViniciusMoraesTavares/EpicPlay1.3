const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticate } = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/upload'); 

// Rotas públicas
router.post('/cadastro', usuarioController.criarUsuario); // Cadastro de usuários
router.post('/login', usuarioController.loginUsuario); // Login

// Rotas protegidas (usuário comum)
router.get('/me', authenticate, usuarioController.getMeuPerfil); // Obter perfil
router.put('/me', authenticate, upload.single('foto'), usuarioController.updateMeuPerfil); // Atualizar perfil

// Rotas protegidas (Admin)
router.get('/', authenticate, isAdmin, usuarioController.getAllUsuarios); // Listar todos usuários
router.put('/:id', authenticate, isAdmin, upload.single('foto'), usuarioController.updateUsuario); // Atualizar usuário
router.put('/promover/:id', authenticate, isAdmin, usuarioController.promoverUsuario); // Promover usuário
router.get('/pesquisar/:id', authenticate, isAdmin, usuarioController.pesquisarUsuarioPorId); // Buscar usuário por ID

module.exports = router;