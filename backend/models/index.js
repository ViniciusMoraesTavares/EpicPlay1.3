const { sequelize, DataTypes } = require('../config/config.js');
const Empresa = require('./empresa')(sequelize, DataTypes);
const Jogo = require('./jogo')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);
const Compra = require('./compra')(sequelize, DataTypes);
const Amizade = require('./amizade')(sequelize, DataTypes);
const Carrinho = require('./carrinho')(sequelize, DataTypes);

// Associações com Jogo e Empresa
Jogo.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Empresa.hasMany(Jogo, { foreignKey: 'empresa_id' });

// Associações com Compra
Compra.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Compra.belongsTo(Jogo, { foreignKey: 'jogo_id' });
Usuario.hasMany(Compra, { foreignKey: 'usuario_id' });
Jogo.hasMany(Compra, { foreignKey: 'jogo_id' });

// Associações para Amizades
Usuario.belongsToMany(Usuario, { 
  through: Amizade, 
  as: 'amizades_iniciadas', // Alias para amizades iniciadas
  foreignKey: 'usuario_id_1',
  otherKey: 'usuario_id_2'
});

Usuario.belongsToMany(Usuario, { 
  through: Amizade, 
  as: 'amizades_recebidas', // Alias para amizades recebidas
  foreignKey: 'usuario_id_2',
  otherKey: 'usuario_id_1'
});

// Adicionando as associações específicas para o modelo Amizade
Amizade.belongsTo(Usuario, { 
  foreignKey: 'usuario_id_1', 
  as: 'iniciador' 
});

Amizade.belongsTo(Usuario, { 
  foreignKey: 'usuario_id_2', 
  as: 'receptor' 
});

// **Associações com Carrinho**
Carrinho.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Carrinho.belongsTo(Jogo, { foreignKey: 'jogo_id' });
Usuario.hasMany(Carrinho, { foreignKey: 'usuario_id' });
Jogo.hasMany(Carrinho, { foreignKey: 'jogo_id' });

module.exports = {
  sequelize,
  Empresa,
  Jogo,
  Usuario,
  Compra,
  Amizade,
  Carrinho,
};
