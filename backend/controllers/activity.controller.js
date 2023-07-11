const db = require('../models');
const { customAlphabet } = require('nanoid')

// Assigning activities to the variable Activity
const Activity = db.activities;
const User = db.users;
const Op = db.Sequelize.Op;

// 創建活動
exports.create = async (req, res) => {
    console.log("owner: ", req.body);

    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

    const activity = new Activity({
        owner: req.body.owner,
        activityTitle: req.body.activityTitle,
        activityInfo: req.body.activityInfo,
        activityKey: nanoid(),
    });
            
    activity
        .save()
        .then((data) => {
            console.log('data: ', data)
            res.send(data);
            console.log("Create activity success~🎉")
        })
        .catch((err) => {
            res.status(500).send({
                activity:
                    err.message || "Some error occurred while creating the activity.",
            });
        });
}

// 我的活動
exports.findMyActivity = async (req, res) => {
    const userId = req.params.userId
    Activity
        .findAll({
              where: {
              owner: userId
          }
        })
        .then((data) => {
            console.log('data: ', data)
            res.status(200).send(data);
        }).catch((err) => {
            res.status(400).send({
            activity:
                err.message || "Some error occurred while finding the activity.",
        });
    });
};