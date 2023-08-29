const db = require('../models');
const { customAlphabet } = require('nanoid')

// Assigning activities to the variable Activity
const Activity = db.Activity;
const User = db.User;
const Op = db.Sequelize.Op;

// Create and Save new Activity.
exports.create = async (req, res) => {
    // const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

    const activity = await Activity.create({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
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
            },
            include: {
                User,
                where: {
                    id: { [Op.ne]: userId }
                }
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
    const { joinCode, userId } = req.body;
    console.log('I want to join this activity!')
    try {
      // Find the activity based on joinCode.
      const activity = await Activity.findOne({ where: { 'groups.member.joinCode': joinCode } });

      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }

      // Spread and add the new member
      const member = {
        ...member,
        userId: userId,
        role: 'member'
      }

      return res.status(200).json({ message: 'User successfully joined the activity', activity: activity });
    } catch (error) {
      console.error('Error joining activity:', error);
      return res.status(500).json({ message: 'Error joining activity' });
    }
}

// 列出某活動的所有參加者
exports.getUsersByActivityId = async (req, res) => {
    const { activityId } = req.params;
    console.log("activityId: ", activityId);
    const activity = await Activity.findByPk(activityId, {
        include: User
    });
    console.log("activity: ", activity.toJSON());
    if (!activity) {
        console.log('Activity not found.');
        return;
    }

    console.log('Activity:', activity.activityTitle);
    res.status(200).send(
        activity.toJSON()
    );
    
    // console.log('Users:', activity.User.map(user => user));

    // Activity.findOne({
    //     where: {
    //         id: activityId
    //     },
    //     include: {
    //         model: User,
    //         attributes: ['username']
    //     }
    // }).then(activity => {
    //     if (!activity) {
    //         return res.status(404).send({ message: "Activity not found." });
    //     }

    //     var members = activity.Users.map(user => user.username);

    //     res.status(200).send({
    //         id: activity.id,
    //         owner: activity.owner,
    //         activityTitle: activity.activityTitle,
    //         activityKey: activity.activityKey,
    //         members: members
    //     });
    // }).catch(err => {
    //     res.status(500).send({ message: err.message });
    // })

    // try {
    //     // Find the activity based on activityId
    //     const activity = await ActivityUser.findOne({
    //       where: { activityId },
    //       include: {
    //         model: User,
    //         attributes: ['id', 'username', 'createdAt', 'updatedAt'],
    //         through: { attributes: ['createdAt', 'updatedAt', 'activityId', 'userId'] }
    //       }
    //     });
    
    //     if (!activity) {
    //       return { success: false, message: 'Activity not found' };
    //     }
    
    //     return { success: true, activity };
    //   } catch (error) {
    //     console.error('Error fetching activity:', error);
    //     return { success: false, message: 'Error fetching activity' };
    //   }
};

// Delete all activities from the database.
exports.deleteAll = (req, res) => {
    Activity.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} activities were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all activities."
          });
        });
};