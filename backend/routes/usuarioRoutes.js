const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { authenticate } = require('../middlewares/authMiddleware');
const usuarioController = require('../controllers/usuarioController');

// Rotas protegidas
router.get('/', authenticate, isAdmin, usuarioController.getAllUsuarios); // Obter todos os usuários
router.get('/pesquisar', authenticate, usuarioController.pesquisarUsuarios); // Pesquisa de usuários
router.get('/me', authenticate, usuarioController.getMeuPerfil); // Obter perfil do usuário logado
router.post('/', authenticate, isAdmin, usuarioController.criarUsuario); // Criar um usuário normal
router.post('/admin', authenticate, isAdmin, usuarioController.createAdmin); // Criar um administrador
router.put('/:id', authenticate, usuarioController.updateUsuario); // Atualizar um usuário específico
router.put('/me', authenticate, usuarioController.updateMeuPerfil); // Atualizar perfil do usuário logado
router.delete('/:id', authenticate, isAdmin, usuarioController.deleteUsuario); // Deletar um usuário específico

// Rotas públicas 
router.post('/criar', usuarioController.criarUsuario); // Criar um usuário 
router.post('/login', usuarioController.loginUsuario); // Login de usuário

module.exports = router;
