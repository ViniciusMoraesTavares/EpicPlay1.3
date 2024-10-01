const express = require('express');
const router = express.Router();
const passport = require('passport');
const usuarioController = require('../controllers/usuarioController');

// Constantes para URLs
const BASE_URL = 'http://localhost:3000';
const LOGIN_URL = `${BASE_URL}/usuarios/login`;
const REDIRECT_URL = `${BASE_URL}/#`;

// Rota para iniciar o login com o Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de callback após a autenticação com o Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: LOGIN_URL }),
  (req, res) => {
    // Redireciona para a página desejada
    res.redirect(REDIRECT_URL); // Ajuste dps
  }
);

// Rota para login normal de usuários
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
