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

// 加入活動
// Create a new student and associate it with the activity.
exports.joinActivity = async (req, res) => {
    const { activityKey, id } = req.body;
    console.log('I want to join this activity!')
    try {
      // Find the activity based on activityKey
      const activity = await Activity.findOne({ where: { activityKey } });

      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }

      // Find the existing user by userId
      const existingUser = await User.findOne({ where: { id } });

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Associate the existing user with the activity
      existingUser.activityId = activity.id;
      await existingUser.save();

      return res.status(200).json({ message: 'User successfully joined the activity', user: existingUser });
    } catch (error) {
      console.error('Error joining activity:', error);
      return res.status(500).json({ message: 'Error joining activity' });
    }
}