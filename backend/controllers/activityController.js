const db = require('../models');
var Activity = require('../models/activityModel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { customAlphabet } = require('nanoid')

exports.createActivity = async (req, res) => {
    console.log("owner: ", req.body);

    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

    const activity = new Activity({
        owner: req.body.owner,
        activityTitle: req.body.activityTitle,
        activityInfo: req.body.activityInfo,
        activityKey: nanoid(),
        activityParts: req.body.activityParts,
        groups: req.body.groups
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

exports.findMyActivity = async (req, res) => {
    const userId = new ObjectId(req.params.userId)
	Activity
        .aggregate([
            // ↓ 顯示該用戶的探究活動 ↓ //
            {   
                $match: {
                    $or: [
                        {"owner": { "$in": [userId] }},
                        {"groups.members": { "$in": [userId] }}
                    ]
                } 
            },
            {
                $lookup: {
                    from: "users",
                    localField:"owner",
                    foreignField:"_id",
                    as: "owner"
                }
            },
            {
                $project: {
                    _id: 0,
                    activityTitle: 1,
                    activityInfo: 1,
                    activityKey: 1,
                    owner: {
                        username: 1
                    }
                }
            },
        ])
        .then((data) => {
            console.log('data: ', data)
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                activity:
                    err.message || "Some error occurred while finding the activity.",
            });
        });
};