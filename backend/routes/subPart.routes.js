module.exports = app => {
    const bodyParser = require('body-parser');
    const subParts = require("../controllers/subPart.controller");
    
    var router = require("express").Router();

    // Create an subParts.
    router.post('/create', bodyParser.json(), subParts.create);

    // Clone one subParts by id.
    router.get('/clone/:subPartId', subParts.cloneSubPart);

    // Update a subParts with the specified id in the request.
    router.put('/:subPartId', subParts.updateSubPart);

    // Delete a subParts with the specified id in the request.
    router.delete('/:subPartId', subParts.delete);

    app.use('/api/subParts', router);
}