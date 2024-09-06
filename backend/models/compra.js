const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Compra = sequelize.define('compra', {
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

      return Compra;
}

