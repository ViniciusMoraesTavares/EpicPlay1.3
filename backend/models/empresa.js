const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

  Empresa.associate = models => {
    // Associações com Jogo
    Empresa.hasMany(models.Jogo, { 
      foreignKey: 'empresa_id', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    });
  };

  return Empresa;
};
