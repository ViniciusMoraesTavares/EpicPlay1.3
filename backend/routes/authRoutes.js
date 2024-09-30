const express = require('express');
const router = express.Router();
const passport = require('passport');
const usuarioController = require('../controllers/usuarioController');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/usuarios/login' }),
  (req, res) => {
    // Redireciona para a página desejada em caso de sucesso
    res.redirect('http://localhost:3000/#'); // trocar dps
  }
);

router.post('/login', usuarioController.loginUsuario);

module.exports = router;
