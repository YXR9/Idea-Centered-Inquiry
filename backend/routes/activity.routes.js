module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), activities.create);
    
    // Get user's all activity.
    router.get('/:userId', activities.findMyActivity);

    // Join an activity.
    router.post('/join', bodyParser.json(), activities.joinActivity);
    
    // Delete all activities.
    router.delete("/", activities.deleteAll);

    // Find all user in activity.
    router.get('/activity/:activityId', activities.getUsersByActivityId);

    app.use('/api/activities', router);
}