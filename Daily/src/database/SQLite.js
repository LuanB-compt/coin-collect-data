const { Sequelize } = require('sequelize');

function getDatabaseInstance(path = '../out/db.sqlite') {
    return new Sequelize({dialect: 'sqlite', storage: path});
}

const sequelize = getDatabaseInstance();

module.exports = {sequelize};
