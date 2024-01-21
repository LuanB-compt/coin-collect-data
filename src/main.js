const axios = require('axios');
const fs = require('fs');


function requestConfig(route = '', method = 'get') {
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

async function request(config = {}, callback) {
    await axios(config)
    .then((response) => {
        callback(response);
    })
    .catch((error) => {
        console.log(error);
    });
}



function main() {
    request(
        requestConfig('exchanges'),
        function (response){
            fs.writeFile(
                './out/Exchanges.json',
                JSON.stringify(response.data),
                'utf8',
                function(err) {
                    if (err) throw err;
                    console.log('complete');
                }
            );
        }
    );
}

if (require.main === module) {
    main();
}