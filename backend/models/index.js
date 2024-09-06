const { sequelize, DataTypes } = require('../config/config.js');
const Empresa = require('./empresa')(sequelize, DataTypes);
const Jogo = require('./jogo')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const Compra = require('./compra')(sequelize, DataTypes);

Jogo.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Empresa.hasMany(Jogo, { foreignKey: 'empresa_id' });

Compra.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Compra.belongsTo(Jogo, { foreignKey: 'jogo_id' });
Usuario.hasMany(Compra, { foreignKey: 'usuario_id' });
Jogo.hasMany(Compra, { foreignKey: 'jogo_id' });

module.exports = {
  sequelize,
  Empresa,
  Jogo,
  Usuario,
  Compra
};
