const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Carrinho = sequelize.define('Carrinho', {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jogo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    }, {
        tableName: 'carrinho',
        timestamps: false,
    });

    return Carrinho;
}