const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Compra = sequelize.define('Compra', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    jogo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'jogo', 
        key: 'id'
      }
    },
    data_compra: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    chave_ativacao: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'compra',
    timestamps: false
  });

  Compra.associate = models => {
    // Associações com Usuario e Jogo
    Compra.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Compra.belongsTo(models.Jogo, { foreignKey: 'jogo_id' });
  };

  return Compra;
};
