const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Amizade = sequelize.define('Amizade', {
    usuario_id_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario', 
        key: 'id'
      }
    },
    usuario_id_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario', 
        key: 'id'
      }
    }
  }, {
    tableName: 'amizades', 
    timestamps: false 
  });
  
  return Amizade;
};
