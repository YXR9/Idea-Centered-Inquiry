const bodyParser = require('body-parser');

module.exports = (app) => {
    const App = require('../controllers/activityController');
    app.post('/activity', bodyParser.json(), App.createActivity);
    app.get('/activity/:userId', App.findMyActivity);
}