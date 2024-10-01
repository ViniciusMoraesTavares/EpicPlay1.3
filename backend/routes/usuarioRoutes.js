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

// Rota para iniciar o login com o Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback após o Google autenticar o usuário
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }), // Desabilita a sessão para usar JWT
  (req, res) => {
    // Retorna o token JWT para o front-end 
    const { token } = req.user;
    res.redirect(`/dashboard?token=${token}`); // Ou retornar um JSON
  }
);

// Rotas para fotos
router.post('/', upload.single('foto'), usuarioController.criarUsuario);
router.post('/admin', upload.single('foto'), usuarioController.createAdmin);
router.put('/:id', upload.single('foto'), usuarioController.updateUsuario);

module.exports = router;
