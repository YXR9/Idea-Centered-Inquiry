module.exports = app => {
    const bodyParser = require('body-parser');
    const groups = require("../controllers/group.controller");

    var router = require("express").Router();

    // Update a Group with joinCode
    router.put("/:joinCode/join", bodyParser.json(), groups.joinGroup);

    // Get all member in activity.
    router.get("/:activityId/members", groups.findMyMember);

    app.use('/api/groups', router);
}