module.exports = app => {
    const bodyParser = require('body-parser');
    const edges = require("../controllers/edge.controller");
    
    var router = require("express").Router();

    // Create an edge.
    router.post('/create', bodyParser.json(), edges.create);

    // Find all nodes in group.
    // router.get('/all/:groupId', nodes.findAllNode);

    // // Get one node.
    // router.get('/:id', nodes.findOneNode);

    // // Update one node.
    // router.put('/:nodeId', nodes.updateNode);

    app.use('/api/edges', router);
}