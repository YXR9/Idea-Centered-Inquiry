module.exports = app => {
    const bodyParser = require('body-parser');
    const users = require("../controllers/user.controller");
    const userAuth = require('../middleware/auth')
    const upload  = require('../middleware/upload');
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/signup", bodyParser.json(), userAuth.saveUser, users.signup);

    // Upload many user
    // router.post('/upload', upload.single('file'), users.batchRegistration)
    router.route('/upload').post(upload.single('file'), users.batchRegistration)

    // User login
    router.post('/login', bodyParser.json(), users.login )
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve all published Tutorials
    // router.get("/published", users.findAllPublished);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };