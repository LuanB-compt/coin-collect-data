const { CoinTableModel } = require("../models/CoinTable")
const { sequelize } = require("../database/SQLite");
const axios = require('axios');
const { Model } = require('sequelize')


class Controller {
    _url = 'https://rest.coinapi.io/v1';
    _keyAPI = 'D23A0AE8-C582-485F-BB2B-CBAD4710FE27';

    constructor (coin = "SOL_BRL", exchange = "BINANCE", period = "15MIN") {
        sequelize.sync();
        this.coin = coin;
        this.exchange = exchange;
        this.period = period;
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
        const route = `ohlcv/${this.exchange}_SPOT_${this.coin}/history?period_id=${this.period}&time_start=2023-01-01T00:00:00`;
        await axios(this._requestConfig(route))
        .then(async (response) => {
            await callback(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    async createCallback(response) {
        const data = response.data;
        data.forEach(async period => {
            let row = await CoinTableModel.create({
                Coin: "SOLBRL",
                DateStart: period.time_period_start,
                DateEnd: period.time_period_end,
                Open: period.price_open,
                High: period.price_high,
                Low: period.price_low,
                Close: period.price_close,
                Volume: period.volume_traded
            })
            row.save()
            console.log("Created " + row.id + " ID");
        });
    }
}
