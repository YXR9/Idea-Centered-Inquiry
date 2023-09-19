module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");

    var router = require("express").Router();

    // Retrieve a single User's profile with id.
    router.get("/:id", profiles.findOne);

    app.use('/api/profiles', router);
}