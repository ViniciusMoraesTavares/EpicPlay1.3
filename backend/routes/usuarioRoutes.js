const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { authenticate } = require('../middlewares/authMiddleware');
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require('passport');

// Rotas protegidas (Admin)
router.get('/', authenticate, isAdmin, usuarioController.getAllUsuarios); // Obter todos os usuários
router.put('/promover/:id', authenticate, isAdmin, usuarioController.promoverUsuario); // Promover user a Admin
router.post('/', authenticate, isAdmin, upload.single('foto'), usuarioController.criarUsuario); // Criar um usuário normal
router.post('/admin', authenticate, isAdmin, upload.single('foto'), usuarioController.createAdmin); // Criar um administrador
router.put('/:id', authenticate, isAdmin, upload.single('foto'), usuarioController.updateUsuario); // Atualizar um usuário específico
router.put('/promover/:id', authenticate, isAdmin, usuarioController.promoverUsuario); // Promover user a Admin

// Rotas protegidas (User)
router.get('/pesquisar/:id', usuarioController.pesquisarUsuarioPorId); // Pesquisar por usuários
router.get('/me', authenticate, usuarioController.getMeuPerfil); // Acessar o próprio perfil
router.put('/me', authenticate, usuarioController.updateMeuPerfil); // Atualizar o próprio perfil

// Rotas públicas 
router.post('/cadastro', usuarioController.criarUsuario); // Criar um usuário sem foto
router.post('/login', usuarioController.loginUsuario); // Login de usuário

// Rota para iniciar o login com o Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback após o Google autenticar o usuário
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`/dashboard?token=${token}`); 
  }
);

// Rota para adicionar fotos ao perfil do usuário
router.put('/me/foto', authenticate, upload.single('foto'), usuarioController.adicionarFotoPerfil); // Adicionar foto ao perfil

module.exports = router;
