const db = require('../models');
const { customAlphabet } = require('nanoid')

// Assigning activities to the variable Activity
const Activity = db.activities;
const Student = db.users;
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

// 加入活動
// Create a new student and associate it with the activity:
exports.joinActivity = async (req, res) => {
    const { activityKey, studentId, studentName } = req.body;

    try {
        // Find the activity with the given activityKey
        const activity = await Activity.findOne({ where: { activityKey } });
    
        if (!activity) {
          return res.status(404).json({ message: 'Activity not found with the given activityKey' });
        }
    
        // Create a new student and associate it with the found activity
        const newStudent = await Student.create({ id: studentId, username: studentName, activityId: activity.id });
    
        return res.status(201).json({ message: 'Student successfully joined the activity', student: newStudent });
    }
    catch (error) {
        console.error('Error joining activity:', error);
        return res.status(500).json({ message: 'Error joining activity' });
    }
  }