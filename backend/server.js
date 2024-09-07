const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json());

const empresaRoutes = require('./routes/empresaRoutes');
const jogoRoutes = require('./routes/jogoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const compraRoutes = require('./routes/compraRoutes');

app.use('/empresas', empresaRoutes);
app.use('/jogos', jogoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/compras', compraRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Erro ao sincronizar com o banco de dados:', err));
