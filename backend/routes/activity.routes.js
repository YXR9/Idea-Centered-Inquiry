module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    // Create an activity.
    router.post('/create', bodyParser.json(), activities.create);

    // Create group.
    router.post('/createGroup', activities.createGroupsForActivity);
    
    // Get user's all activity.
    router.get('/myActivity', activities.findMyActivity);

    // Find all user in activity.
    router.get('/myJoinedActivity', activities.getJoinedActivitiesByUserId);

    // Ger user's one activity.
    router.get('/:id', activities.findOneActivity);
    
    // Delete all activities.
    router.delete('/', activities.deleteAll);

    app.use('/api/activities', router);
}