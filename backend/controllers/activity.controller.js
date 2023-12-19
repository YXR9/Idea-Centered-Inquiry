const db = require('../models');
const { customAlphabet } = require('nanoid');

// Assigning activities to the variable Activity
const User = db.User;
const Activity = db.Activity;
const Group = db.Group;
const ActivityGroup = db.ActivityGroup;
const UserActivityGroup = db.UserActivityGroup;

// Create and Save new Activity.
exports.create = async (req, res) => {
    const activity = await Activity.create({
        title: req.body.title,
        userId: req.body.userId,
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

// Create and Save one Group
exports.createOneGroupForActivity = async (req, res) => {
    const { groupName, activityId, userId } = req.body;

    try {
        const joinCode = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)();
        const group = await Group.create({
            groupName: groupName,
            joinCode: joinCode,
            activityId: activityId,
            userId: userId
        });

        await ActivityGroup.create({
            ActivityId: activityId,
            GroupId: group.id
        })

        console.log('Created group:', group);
        res.status(200).send({
            message: 'Group created successfully',
            group: group
        });
    } catch (err) {
        console.log('Error while creating group:', err);
        res.status(500).send({
            message: 'Error while creating group',
            error: err.message
        });
    }
}

// Create and Save new Groups
exports.createGroupsForActivity = async (req, res) => {
    const { groupName, activityId, numGroups } = req.body;

    try {
        const createdGroups = [];

        for (let i = 0; i < numGroups; i++) {
            const joinCode = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)();
            const group = await Group.create({
                groupName: groupName,
                joinCode: joinCode,
                activityId: activityId,
                userId: new Array()
            });

            createdGroups.push(group);

            await ActivityGroup.bulkCreate([{
                ActivityId: activityId,
                GroupId: group.id
            }])
        }

        console.log('Created groups:', createdGroups);
        res.status(200).send({
            message: 'Groups created successfully',
            groups: createdGroups
        });
    } catch (err) {
        console.log('Error while creating groups:', err);
        res.status(500).send({
            message: 'Error while creating groups',
            error: err.message
        });
    }
}

// Find all activity by userId(owner).
exports.findMyActivity = (req, res) => {
    Activity
        .findAll({
            where: {
                userId: req.params.userId
            },
            include: [
                {
                    model: Group,
                    // attributes: ["className"],
                    through: { attributes: [] }
                }
            ]
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

// Find a single activity with an id.
exports.findOneActivity = (req, res) => {
    const id = req.params.id;

    Activity.findByPk(id, {
            include: [
                {
                    model: Group,
                    attributes: ["id", "groupName", "joinCode", "userId"],
                    through: { attributes: [] }
                },
            ] 
        })
        .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find activity with id=${id}.`
              });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: 
                err.message || "Error retrieving activity with id=" + id,
            });
        });
};

// Get User joined's Activities by id.
exports.getJoinedActivitiesByUserId = (req, res) => {
    UserActivityGroup
        .findAll({
            where: {
                UserId: req.params.userId
            },
            include: [
                {
                    model: ActivityGroup,
                    include: [{
                        model: Activity,
                    }]
                }
            ]
        })
        .then((data) => {
            console.log('data: ', data);
            res.status(200).send(data);
        }).catch((err) => {
            res.status(400).send({
            activity:
                err.message || "Some error occurred while finding your joined activity.",
            });
        });
};

// Clone one activity by id.
exports.cloneActivity = (req, res) => {
    const activityId = req.params.activityId;
    Activity.findOne({
        where: { id: activityId },
        raw: true
    })
    .then(data => {
        delete data.id;
        Activity.create(data);
        console.log('data: ', data)
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send({
            activity:
                err.message || "Some error occurred while finding your activity.",
        });
    });
}

// Update a Activity with the specified id in the request.
exports.updateActivity = (req, res) => {
    const activityId = req.params.activityId;

    Activity.update(req.body, {
        where: { id: activityId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Activity was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Activity with id=${activityId}. Maybe Activity was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err || "Error updating activity with id=" + activityId
        });
    });
}

// Delete a Activity with the specified id in the request.
exports.delete = (req, res) => {
    const activityId = req.params.activityId;

    Activity.destroy({
      where: { id: activityId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Activity was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete activity with id=${activityId}. Maybe activity was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            message: 
                err || "Could not delete group with id=" + activityId
        });
      });
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