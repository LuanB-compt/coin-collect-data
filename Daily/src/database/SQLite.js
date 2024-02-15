const { Sequelize } = require('sequelize');

class Database {
    sequelize = null;
    path = ''

    constructor(path = '../out/db.sqlite'){
        this.path = path;
        this.sequelize = getDatabaseInstance(path);
    }

    getDatabaseInstance() {
        return new Sequelize({dialect: 'sqlite', storage: this.path});
    }
}

module.exports = new Database();
