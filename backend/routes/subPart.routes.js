module.exports = app => {
    const bodyParser = require('body-parser');
    const subParts = require("../controllers/subPart.controller");
    
    var router = require("express").Router();

    // Create an subParts.
    router.post('/create', bodyParser.json(), subParts.create);

    app.use('/api/subParts', router);
}