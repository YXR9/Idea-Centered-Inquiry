module.exports = app => {
    const bodyParser = require('body-parser');
    const nodes = require("../controllers/node.controller");
    
    var router = require("express").Router();

    // Create an node.
    router.post('/create', bodyParser.json(), nodes.create);

    // Find all nodes in subPart.
    router.get('/all', nodes.findAllNode);

    // Get one node.
    router.get('/:id', nodes.findOneNode);

    // Update one node.
    router.put('/:nodeId', nodes.updateNode);

    app.use('/api/nodes', router);
}