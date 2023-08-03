module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    router.post('/create', bodyParser.json(), activities.create);
    
    // Get user's all activity.
    router.get('/:userId', activities.findMyActivity);

    router.post('/join', activities.joinActivity);

    app.use('/api/activities', router);
}