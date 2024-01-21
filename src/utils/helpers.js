const axios = require('axios');

export function requestConfig(route = '', method = 'get') {
    return {
        method: method,
        maxBodyLength: Infinity,
        url: `https://rest.coinapi.io/v1/${route}`,
        headers: { 
          'Accept': 'application/json', 
          'X-CoinAPI-Key': 'D23A0AE8-C582-485F-BB2B-CBAD4710FE27'
        }
    };
}

export async function request(config = {}, callback) {
    await axios(config)
    .then((response) => {
        callback(response);
    })
    .catch((error) => {
        console.log(error);
    });
}