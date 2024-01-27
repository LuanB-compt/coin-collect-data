const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/SQLite');


class CoinTableModel extends Model {}

CoinTableModel.init({
    Symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    OpenDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        autoIncrement: false,
        unique: false
    },
    CloseDateTime: {
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
    },
    NumTrades: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: false,
        unique: false,
        defaultValue: -1
    }
}, {sequelize, modelName: 'CoinTable', timestamps: true});

module.exports = {CoinTableModel};
