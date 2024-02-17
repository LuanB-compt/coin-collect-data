const Binance = require('node-binance-api')


class ControllerBinance {
    symbol = '';
    interval = '';
    binance = new Binance();

    constructor(symbol = '', interval = '15m'){
        this.symbol = symbol;
        this.interval = interval
    }

    async request() {
        this.binance.websockets.candlesticks([this.symbol], this.interval, (candlesticks) => {
            let { e:eventType, E:eventTime, s:symbol, k:ticks } = candlesticks;
            let { o:open, h:high, l:low, c:close, v:volume, n:trades, i:interval, x:isFinal, q:quoteVolume, V:buyVolume, Q:quoteBuyVolume } = ticks;
            const result = {
                CloseTime: new Date(eventTime).toJSON(),
                Open: open,
                High: high,
                Low: low,
                Close: Close,
                Volume: volume,
                NumTrades: trades,
                Symbol: this.symbol
            }
            let endpoints = this.binance.websockets.subscriptions();
            for ( let endpoint in endpoints ) {
                this.binance.websockets.terminate(endpoint);
            };
            return result;
        });
    }
}

const c = new ControllerBinance("SOLUSDT");
c.test();

module.exports = {ControllerBinance}