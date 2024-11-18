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
      allowNull: false, // Certifica que sempre existe uma empresa associada
      references: {
        model: 'empresa', // Nome da tabela associada
        key: 'id'
      },
      onDelete: 'CASCADE', // Exclui o jogo se a empresa for deletada
      onUpdate: 'CASCADE' // Atualiza os registros se o ID da empresa mudar
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
    capa: {
      type: DataTypes.STRING,
    },
    img_1: {
      type: DataTypes.STRING,
    },
    img_2: {
      type: DataTypes.STRING,
    },
    img_3: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'jogo', 
    timestamps: false
  });

  Jogo.associate = models => {
    // Associação com Empresa
    Jogo.belongsTo(models.Empresa, { 
      foreignKey: 'empresa_id', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    });

    // Associação reversa da Empresa para Jogo
    models.Empresa.hasMany(Jogo, { 
      foreignKey: 'empresa_id', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Associações com Compra
    Jogo.belongsToMany(models.Usuario, { 
      through: models.Compra, 
      as: 'usuarios', 
      foreignKey: 'jogo_id' 
    });
    models.Usuario.belongsToMany(Jogo, { 
      through: models.Compra, 
      as: 'jogos', 
      foreignKey: 'usuario_id' 
    });
  };

  return Jogo;
};
