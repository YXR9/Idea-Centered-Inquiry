module.exports = app => {
    const bodyParser = require('body-parser');
    const groups = require("../controllers/group.controller");

    var router = require("express").Router();

    // Update a Group with joinCode
    router.put("/:joinCode/join", bodyParser.json(), groups.joinGroup);

    app.use('/api/groups', router);
}