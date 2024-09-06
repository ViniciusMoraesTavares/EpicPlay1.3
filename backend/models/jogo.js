const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Jogo = sequelize.define('Jogo', {
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
    sinopse: {
      type: DataTypes.TEXT
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'empresa', 
        key: 'id'
      }
    },
    avaliacao: {
      type: DataTypes.DECIMAL(3, 2)
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2)
    },
    duracao: {
      type: DataTypes.INTEGER
    },
    genero: {
      type: DataTypes.STRING
    },
    fotos: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'jogo', 
    timestamps: false
  });

  return Jogo;
};
