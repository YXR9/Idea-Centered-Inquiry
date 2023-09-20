module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), activities.create);

    // Create one group.
    router.post('/createOneGroup', activities.createOneGroupForActivity);

    // Create many groups.
    router.post('/createGroups', activities.createGroupsForActivity);
    
    // Get user's all activity.
    router.get('/myActivity', activities.findMyActivity);

    // Get user's one activity.
    router.get('/:id', activities.findOneActivity);

    // Find all user in activity.
    router.get('/:userId/myJoined', activities.getJoinedActivitiesByUserId);

    // Clone one activity by id.
    router.get('/clone/:activityId', activities.cloneActivity);

    // Update a Activity with the specified id in the request.
    router.put('/:activityId', activities.updateActivity);

    // Delete a Activity with the specified id in the request.
    router.delete('/:activityId', activities.delete);
    
    // Delete all activities.
    router.delete('/', activities.deleteAll);

    app.use('/api/activities', router);
}