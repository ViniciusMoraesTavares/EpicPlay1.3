const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Usuario } = require('../models');
const { gerarToken } = require('../services/authService');

// Configuração da estratégia do Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Verifica se o usuário já existe com base no Google ID
    let user = await Usuario.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      // Se o usuário não existir, cria um novo
      user = await Usuario.create({
        nome: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
      });
    }

    // Gera um token JWT para o usuário
    const token = gerarToken(user);
    
    // Retorna o usuário e o token
    done(null, { user, token });
  } catch (error) {
    done(error, null); // Em caso de erro, chama done com o erro
  }
}));

// Serialize o usuário para a sessão
passport.serializeUser((user, done) => {
  done(null, user.id); // Armazena apenas o ID do usuário
});

// Deserialize o usuário da sessão
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user); // Retorna o usuário encontrado
  } catch (err) {
    done(err); // Em caso de erro, chama done com o erro
  }
});

module.exports = passport;
