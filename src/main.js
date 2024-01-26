const { Controller } = require("./controller/Controller");
const { processerDateString } = require("./utils/helpers");

async function main() {
    const controller = new Controller();
    const count = await controller.getCount();
    if (typeof count === "number"){
        if (count == 0){
            controller.request(controller.createCallback, '2023-01-01T00:00:00');
            return false;
        } else {
            const lastObj = await controller.getLastObj();
            if(lastObj == undefined) return true;
            else {
                var lastDate = JSON.stringify(lastObj.DateEnd);
                lastDate = processerDateString(lastDate);
                if (lastDate == '2024-01-20T00:00:00') return true;
                else {
                    controller.request(controller.createCallback, lastDate);
                    return false;
                }
            }
        }
    } else {return true};
}

const start = async function() {
    var finish = false;
    while (finish == false) {
        finish = await main();
        console.log(finish);
        setTimeout(() => {}, 5000);
    };
}

if (require.main === module) {
    start();
}