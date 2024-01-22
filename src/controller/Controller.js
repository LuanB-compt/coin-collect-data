const { CoinTableModel } = require("../models/CoinTable")
const { sequelize } = require("../database/SQLite");

class Controller {
    constructor () {
        sequelize.sync();
    }
    
}
