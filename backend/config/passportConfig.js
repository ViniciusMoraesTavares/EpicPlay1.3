const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Usuario } = require('../models');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await Usuario.findOne({ where: { googleId: profile.id } });
    
    if (!user) {
      user = await Usuario.create({
        nome: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value 
      });
    }
    
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Serialização e desserialização do usuário
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
