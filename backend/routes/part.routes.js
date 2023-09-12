module.exports = app => {
    const bodyParser = require('body-parser');
    const parts = require("../controllers/part.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), parts.create);

    // Find all part in activity.
    router.get('/all', parts.findAllPart);

    app.use('/api/parts', router);
}