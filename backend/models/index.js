const { sequelize, DataTypes } = require('../config/config.js');
const Empresa = require('./empresa')(sequelize, DataTypes);
const Jogo = require('./jogo')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const Compra = require('./compra')(sequelize, DataTypes);
const Amizade = require('./amizade')(sequelize, DataTypes);

// Associações com Jogo e Empresa
Jogo.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Empresa.hasMany(Jogo, { foreignKey: 'empresa_id' });

// Associações com Compra
Compra.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Compra.belongsTo(Jogo, { foreignKey: 'jogo_id' });
Usuario.hasMany(Compra, { foreignKey: 'usuario_id' });
Jogo.hasMany(Compra, { foreignKey: 'jogo_id' });

// Associações para Jogos comprados
Usuario.belongsToMany(Jogo, { through: Compra, as: 'jogosComprados', foreignKey: 'usuario_id' });

// Associações para Amizades
Usuario.belongsToMany(Usuario, { 
  through: Amizade, 
  as: 'amigos', 
  foreignKey: 'usuario_id_1',
  otherKey: 'usuario_id_2'
});
Usuario.belongsToMany(Usuario, { 
  through: Amizade, 
  as: 'amigosDe', 
  foreignKey: 'usuario_id_2',
  otherKey: 'usuario_id_1'
});

module.exports = {
  sequelize,
  Empresa,
  Jogo,
  Usuario,
  Compra,
  Amizade,
};
