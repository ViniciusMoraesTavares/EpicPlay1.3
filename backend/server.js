// Importação das dependências
const http = require('http'); 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session'); 
const { sequelize } = require('./models');
require('dotenv').config();

// Importação das classes de erro personalizadas 
const AuthenticationError = require('./errors/AuthenticationError');
const AuthorizationError = require('./errors/AuthorizationError');
const ValidationError = require('./errors/ValidationError');
const NotFoundError = require('./errors/NotFoundError');
const DatabaseError = require('./errors/DatabaseError');
const LoginError = require('./errors/LoginError');
const PasswordValidationError = require('./errors/PasswordValidationError');

const app = express();
const port = process.env.PORT 

const server = http.createServer({
  maxHeaderSize: 100000000000, //teste
}, app);

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Para requisições form-urlencoded

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true 
}));

// Chamando as rotas do aplicativo
const empresaRoutes = require('./routes/empresaRoutes');
const jogoRoutes = require('./routes/jogoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const compraRoutes = require('./routes/compraRoutes');

// Usando as rotas nas respectivas URLs
app.use('/empresas', empresaRoutes);
app.use('/jogos', jogoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/compras', compraRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack); 

  // Tratamento de erros específicos
  if (err instanceof AuthenticationError) {
    return res.status(err.statusCode || 401).json({ error: err.message });
  }
  if (err instanceof AuthorizationError) {
    return res.status(err.statusCode || 403).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(err.statusCode || 400).json({ error: err.message });
  }
  if (err instanceof PasswordValidationError) {
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

  // Erro genérico
  res.status(err.statusCode || 500).json({ error: 'Erro interno do servidor.' });
});

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.'); 
    server.listen(port, () => { 
      console.log(`Servidor rodando na porta http://localhost:${port}`); 
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));