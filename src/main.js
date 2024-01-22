const {request, requestConfig} = require('./utils/helpers');
const fs = require('fs');

function saveOutput(response, path = ''){
    fs.writeFile(path, JSON.stringify(response.data), 'utf8',
        function(err) {
            if (err) throw err;
            console.log('complete');
        }
    );
}

function main() {
    request(
        requestConfig('exchanges'),
        
    );
}

if (require.main === module) {
    main();
}