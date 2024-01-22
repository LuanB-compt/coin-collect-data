const { CoinTableModel } = require("../models/CoinTable")
const { sequelize } = require("../database/SQLite");
const axios = require('axios');


class Controller {
    _url = 'https://rest.coinapi.io/v1';
    _keyAPI = 'D23A0AE8-C582-485F-BB2B-CBAD4710FE27'

    constructor () {
        sequelize.sync();
    }
    
    _requestConfig(route = '', method = 'get') {
        return {
            method: method,
            maxBodyLength: Infinity,
            url: `${this._url}/${route}`,
            headers: { 
              'Accept': 'application/json', 
              'X-CoinAPI-Key': this._keyAPI
            }
        };
    }
    
    async request(callback) {
        await axios(this._requestConfig(''))
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
