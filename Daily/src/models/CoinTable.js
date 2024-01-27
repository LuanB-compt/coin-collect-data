const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/SQLite');


class CoinTableModel extends Model {}

CoinTableModel.init({
    Coin: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    DateStart: {
        type: DataTypes.DATE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    DateEnd: {
        type: DataTypes.DATE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
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
    },
    Volume: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    }
}, {sequelize, modelName: 'CoinTable', timestamps: true});

module.exports = {CoinTableModel};
