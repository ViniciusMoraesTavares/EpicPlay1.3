const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    foto: {
      type: DataTypes.STRING
    },
    redes_sociais: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'empresa',
    timestamps: false
  });

  return Empresa;
};
