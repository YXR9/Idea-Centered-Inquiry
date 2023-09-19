const db = require('../models');

const User = db.User;
const Profile = db.Profile;
const UserProfile = db.UserProfile;

// Find UserProfile with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        include: [{
            model: UserProfile,
            include: [{
                model: Profile
            }]
        }]
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    });
};