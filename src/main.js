const fs = require('fs');

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