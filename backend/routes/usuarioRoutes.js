const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { authenticate } = require('../middlewares/authMiddleware');
const usuarioController = require('../controllers/usuarioController');

// Rotas protegidas (Admin)
router.get('/', authenticate, isAdmin, usuarioController.getAllUsuarios); // Obter todos os usuários
router.post('/', authenticate, isAdmin, usuarioController.criarUsuario); // Criar um usuário normal
router.post('/admin', authenticate, isAdmin, usuarioController.createAdmin); // Criar um administrador
router.put('/:id', authenticate, isAdmin, usuarioController.updateUsuario); // Atualizar um usuário específico
router.put('/promover/:id', authenticate, isAdmin, usuarioController.promoverUsuario); // Promover user a Admin
router.delete('/:id', authenticate, isAdmin, usuarioController.deleteUsuario); // Deletar um usuário específico

//Rotas Protegidas (User)
router.get('/pesquisar/:id', authenticate, usuarioController.pesquisarUsuarioPorId); // Pesquisar por usuários
router.get('/me', authenticate, usuarioController.getMeuPerfil); // Acessar o proprio perfil
router.put('/me', authenticate, usuarioController.updateMeuPerfil); // Atualizar o proprio perfil 
router.delete('/me', authenticate, usuarioController.deleteMeuPerfil); // Deletar o proprio perfil

// Rotas públicas 
router.post('/cadastro', usuarioController.criarUsuario); // Criar um usuário 
router.post('/login', usuarioController.loginUsuario); // Login de usuário

module.exports = router;
