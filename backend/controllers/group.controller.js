const db = require('../models');

// Assigning groups to the variable Group
const User = db.User;
const Group = db.Group;
const Activity = db.Activity;
const UserActivityGroup = db.UserActivityGroup;
const ActivityGroup = db.ActivityGroup;
const Op = db.Sequelize.Op;

// Join group by join code.
exports.joinGroup = async (req, res) => {
    const userId = req.body.userId;
    const joinCode = req.params.joinCode;

    try {
        // 查找具有指定 joinCode 的小組
        const group = await Group.findOne({
            where: {
                joinCode: joinCode,
            },
        });

        if (!group) {
            return res.status(404).send({ message: 'Group not found.' });
        }

        console.log("ActivityGroupId: ", group.id)
        await UserActivityGroup.bulkCreate([{
            UserId: userId,
            ActivityGroupId: group.id
        }])

        // 將使用者 ID 添加到小組的 userId 數組中
        group.userId = [...group.userId, userId];

        // 更新小組
        await group.save();

        // 也可以選擇更新相關的 Activity 模型，以標記使用者已加入活動

        res.status(200).send({
            message: 'User joined the activity successfully.',
            group: group
        });
    } catch (err) {
        console.error('Error while joining activity:', err);
        res.status(500).send({
            activity:
                err.message || 'Some error occurred while joining the activity.',
        });
    }
};

// Find one activity's all memebers.
exports.findMyMember = (req, res) => {
    Activity
        .findAll({
            where: {
                id: req.params.id
            },
            include: [{
                model: Group,
                include: [{
                    model: ActivityGroup,
                    include: [{
                        model: User,
                        through: { attributes: [] }
                    }],
                    Group
                }]
            }]  
        })
        .then((data) => {
            console.log('data: ', data)
            res.status(200).send(data);
        }).catch((err) => {
            res.status(400).send({
            activity:
                err.message || "Some error occurred while finding your activity.",
        });
    });
};

// Update a Group with the specified id in the request
exports.updateGroup = (req, res) => {
    const groupId = req.params.groupId;

    Group.update(req.body, {
        where: { id: groupId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Group was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Group with id=${groupId}. Maybe Group was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err || "Error updating group with id=" + groupId
        });
    });
}

// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
    const groupId = req.params.groupId;

    Group.destroy({
      where: { id: groupId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete group with id=${groupId}. Maybe group was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            message: 
                err || "Could not delete group with id=" + groupId
        });
      });
};