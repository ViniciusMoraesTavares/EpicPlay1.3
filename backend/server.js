const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); 
const passport = require('passport');
require('./config/passportConfig'); 
const { sequelize } = require('./models');
const AuthenticationError = require('./errors/AuthenticationError');
const AuthorizationError = require('./errors/AuthorizationError');
const ValidationError = require('./errors/ValidationError');
const NotFoundError = require('./errors/NotFoundError');
const DatabaseError = require('./errors/DatabaseError');
const LoginError = require('./errors/LoginError');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true
}));

// Inicializar o Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Chamando as Rotas
const empresaRoutes = require('./routes/empresaRoutes');
const jogoRoutes = require('./routes/jogoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const compraRoutes = require('./routes/compraRoutes');
const amizadeRoutes = require('./routes/amizadeRoutes');
const authRoutes = require('./routes/authRoutes'); // Rotas de autenticação com o Google

// Usando as Rotas
app.use('/empresas', empresaRoutes);
app.use('/jogos', jogoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/compras', compraRoutes);
app.use('/amizades', amizadeRoutes); 
app.use('/auth', authRoutes); // Usar as rotas de autenticação do Google

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode || 401).json({ error: err.message });
  }
  if (err instanceof AuthorizationError) {
    return res.status(err.statusCode || 403).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(err.statusCode || 400).json({ error: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode || 404).json({ error: err.message });
  }
  if (err instanceof DatabaseError) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
  if (err instanceof LoginError) {
    return res.status(err.statusCode || 401).json({ error: err.message });
  }
  // Erro desconhecido
  res.status(err.statusCode || 500).json({ error: 'Erro interno do servidor.' });
});

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
