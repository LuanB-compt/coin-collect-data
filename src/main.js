const {request, requestConfig} = require('./utils/helpers');
const fs = require('fs');

function main() {
    request(
        requestConfig('exchanges'),
        
    );
}

if (require.main === module) {
    main();
}