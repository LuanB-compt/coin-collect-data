const { Controller } = require("./controller/Controller");

function main(controller) {
    controller.request(controller.createCallback);
}

if (require.main === module) {
    const controller = new Controller();
    main(controller);
}