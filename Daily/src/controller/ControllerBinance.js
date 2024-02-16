const Binance = require('node-binance-api')
const binance = new Binance().options({
    APIKEY: `NVojuzwfetkXRMgKFTJcBJxCDmAws6J3DqRirsPnKIj0HCDctMMSXFBJWEAapA9o`,
    APISECRET: `HlQvCWkQ5rkYkLUWxq0MTLOfNKQtVwrjmwmPVv0FqZuzs7UFXpa9fPHWyx4QF2az`
})

class ControllerBinance {
    constructor(){
        
    }

    async test() {
        binance.bookTickers('BNBBTC', (error, ticker) => {
            console.info("bookTickers", ticker);
        });
    }
}

const c = new ControllerBinance();
c.test()

module.exports = {ControllerBinance}