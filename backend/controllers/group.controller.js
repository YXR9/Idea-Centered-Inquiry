const { User } = require('../models');
const db = require('../models');

// Assigning groups to the variable Group
const Group = db.Group;
const UserActivityGroup = db.UserActivityGroup;
const Op = db.Sequelize.Op;

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

        res.send({ message: 'User joined the activity successfully.' });
    } catch (err) {
        console.error('Error while joining activity:', err);
        res.status(500).send({
            activity:
                err.message || 'Some error occurred while joining the activity.',
        });
    }
};

exports.findMyMember = (req, res) => {
    Group
        .findAll({
            where: {
                activityId: req.body.activityId
            },
            include: [
                {
                    model: User,
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