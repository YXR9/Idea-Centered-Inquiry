module.exports = app => {
    const bodyParser = require('body-parser');
    const users = require("../controllers/user.controller");
    const userAuth = require('../middleware/auth')
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/signup", bodyParser.json(), userAuth.saveUser, users.signup);
    router.post('/login', bodyParser.json(), users.login )
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", users.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
    
    // Get user's all activity.
    router.get('/activities/:userId', users.findMyActivity);
  
    app.use('/api/users', router);
  };