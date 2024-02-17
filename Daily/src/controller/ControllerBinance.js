const { CoinTableModel } = require("../models/CoinTable")
const { sequelize } = require("../database/SQLite");
const Binance = require('node-binance-api')


class ControllerBinance {
    symbol = '';
    interval = '';
    binance = new Binance();

    constructor(symbol = '', interval = '15m'){
        sequelize.sync()
        this.symbol = symbol;
        this.interval = interval
    }

    async request() {
        await this.binance.websockets.candlesticks([this.symbol], this.interval, (candlesticks) => {
            const { E:eventTime, k:ticks } = candlesticks;
            const { o:open, h:high, l:low, c:close, v:volume, n:trades } = ticks;
            let endpoints = this.binance.websockets.subscriptions();
            for ( let endpoint in endpoints ) {
                this.binance.websockets.terminate(endpoint);
            };
            this.save({
                CloseTime: new Date(eventTime).toJSON(),
                Open: open,
                High: high,
                Low: low,
                Close: close,
                Volume: volume,
                NumTrades: trades
            })
        })
    }

    async save(result){
        let row = await CoinTableModel.create({
            Symbol: this.symbol,
            OpenDateTime: null,
            CloseDateTime: result.CloseTime,
            Open: result.Open,
            High: result.High,
            Low: result.Low,
            Close: result.Close,
            Volume: result.Volume,
            NumTrades: result.NumTrades
        })
        row.save();
        console.log("Created " + row.id + " ID");
    }
}

const c = new ControllerBinance("SOLUSDT");
const result = c.request();

module.exports = {ControllerBinance}