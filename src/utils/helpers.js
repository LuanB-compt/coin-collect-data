const fs = require('fs');

function saveOutput(response, path = ''){
    fs.writeFile(path, JSON.stringify(response.data), 'utf8',
        function(err) {
            if (err) throw err;
            console.log('complete');
        }
    );
}

function processerDateString(date = '') {
    date = date.slice(0, -6);
    return date;
}

module.exports = { processerDateString };