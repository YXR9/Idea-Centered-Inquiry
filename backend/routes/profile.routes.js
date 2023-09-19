module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");

    var router = require("express").Router();

    // Retrieve a single User's profile with id.
    router.get("/:id", profiles.findOne);

    // Get all user with classname.
    router.get("/", profiles.findUserByClassName);

    app.use('/api/profiles', router);
}