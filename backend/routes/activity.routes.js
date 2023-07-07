module.exports = app => {
    const bodyParser = require('body-parser');
    const activities = require("../controllers/activity.controller");
    
    var router = require("express").Router();

    router.post('/create', bodyParser.json(), activities.create);

    app.use('/api/activities', router);
}