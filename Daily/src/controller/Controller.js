const { CoinTableModel } = require("../models/CoinTable")
const { sequelize } = require("../database/SQLite");
const axios = require('axios');



class Controller {
    _url = 'https://rest.coinapi.io/v1';
    _keyAPI = 'D23A0AE8-C582-485F-BB2B-CBAD4710FE27';
    _route = 'ohlcv/{EXCHANGE}_SPOT_{SYMBOL}/history?period_id={PERIOD}&time_start={TIME_START}';

    constructor (symbol = "SOL_BRL", exchange = "BINANCE", period = "15MIN") {
        sequelize.sync();
        this.symbol = symbol;
        this.exchange = exchange;
        this.period = period;
        this._updateNowTime();
    }

    _createRequestConfig() {
        return {
            method: 'get',
            maxBodyLength: 'Infinity',
            url: `${this._url}/${this._route}`,
            headers: { 
                'Accept': 'application/json', 
                'X-CoinAPI-Key': this._keyAPI
            }
        };
    }

    _updateNowTime() {
        this.nowTime = new Date();
        this.nowTime.setMinutes(this.nowTime.getMinutes() - 15)
        this.nowTime = this.nowTime.toJSON().slice(0,-5);
    }

    _updateConfigRequest() {
        this._updateNowTime();
        this._route = this._route
            .replace('{EXCHANGE}', this.exchange)
            .replace('{SYMBOL}', this.symbol)
            .replace('{PERIOD}', this.period)
            .replace('{TIME_START}', this.nowTime);
    }

    async request(callback) {
        this._updateConfigRequest();
        await axios(this._createRequestConfig())
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
                Symbol: "SOLBRL",
                OpenDateTime: period.time_period_start,
                CloseDateTime: period.time_period_end,
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

    async readAll() {
        const data = await CoinTableModel.findAll();
        if (data != undefined){
            return JSON.stringify(data, null, 2);
        };
        return false;
    }

    async getLastObj(){
        const id = await CoinTableModel.count();
        if (id == undefined) {
            return false;
        };
        const obj = await CoinTableModel.findByPk(id);
        if (obj == undefined) {
            return false;
        };
        return obj.toJSON();
    }

    async getCount(){
        const count = await CoinTableModel.count();
        if (count == undefined){
            return false;
        };
        return count;
    }
}

module.exports = { Controller };