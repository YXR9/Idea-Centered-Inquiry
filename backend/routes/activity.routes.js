module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), activities.create);

    router.post('/createGroup', activities.createGroupsForActivity);
    
    // Get user's all activity.
    router.get('/myActivity', activities.findMyActivity);

    router.get('/:id', activities.findOneActivity);
    
    // Delete all activities.
    router.delete("/", activities.deleteAll);

    // Find all user in activity.
    router.get('/activity/:activityId', activities.getUsersByActivityId);

    app.use('/api/activities', router);
}