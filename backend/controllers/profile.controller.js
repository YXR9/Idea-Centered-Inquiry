const db = require('../models');

const User = db.User;
const Profile = db.Profile;
const UserProfile = db.UserProfile;

// Find UserProfile with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log("😜")

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

// Find UserProfile with an classname
exports.findUserByClassName = (req, res) => {
    console.log("😍")
    const className = req.body.className;
    Profile.findAll({
        where: {
            className: className,
        },
        include: [{
            model: User
        }]
    })
    .then(data => {
        if (data.length > 0) { // 檢查數據是否為空
            res.send(data);
        } else {
            res.status(404).send({
                message: `No users found with className=${req.body.className}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error retrieving users by className=" + req.body.className
        });
    });
};
