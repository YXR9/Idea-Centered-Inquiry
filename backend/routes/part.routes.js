module.exports = app => {
    const bodyParser = require('body-parser');
    const parts = require("../controllers/part.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), parts.create);

    // Find all part in activity.
    router.get('/all', parts.findAllPart);

    // Clone one part by id.
    router.get('/clone/:partId', parts.clonePart);

    // Update a Part with the specified id in the request.
    router.put('/:partId', parts.updatePart);

    // Delete a Part with the specified id in the request.
    router.delete('/:partId', parts.delete);

    app.use('/api/parts', router);
}