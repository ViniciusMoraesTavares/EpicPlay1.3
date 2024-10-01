const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: true, 
      validate: {
        notEmpty(value) {
          if (this.googleId === null && (!value || value === '')) {
            throw new Error('A senha não pode estar vazia.');
          }
        },
        len: {
          args: [8, 100], 
          msg: 'A senha deve ter pelo menos 8 caracteres.'
        }
      }
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true  
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    foto: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {
    tableName: 'usuario',
    timestamps: false
  });

  return Usuario;
};
