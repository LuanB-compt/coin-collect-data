const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/SQLite');


class CoinTableModel extends Model {}

CoinTableModel.init({
    Open: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    High: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    Low: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    Close: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    }
}, {sequelize, modelName: 'CoinTable', timestamps: true});

module.exports = {CoinTableModel};
