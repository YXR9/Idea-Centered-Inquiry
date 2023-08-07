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
    router.post('/join', bodyParser.json(), activities.joinActivity);

    app.use('/api/activities', router);
}