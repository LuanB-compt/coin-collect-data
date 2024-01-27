const { Controller } = require("./src/controller/Controller");

async function main(controller) {
    const count = await controller.getCount();
    if (typeof count === "number"){
        if (count == 0){
            return true;
        } else {
            controller.request(controller.createCallback);
        }
    } else {return true};
}

const start = async function(controller) {
    var finish = false;
    while (finish == false) {
        finish = await main(controller);
        setTimeout(() => {}, 900000);
    };
}

if (require.main === module) {
    const controller = new Controller();
    start(controller);
}