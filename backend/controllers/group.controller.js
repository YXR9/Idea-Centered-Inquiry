const db = require('../models');

// Assigning groups to the variable Group
const Group = db.Group;
const Op = db.Sequelize.Op;

exports.joinGroup = async (req, res) => {
    await Group.update({ userId: req.body.userId }, {
        where: {
            joinCode: req.params.joinCode,
        },
    })
    .then((data) => {
        console.log('data: ', data)
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            group:
                err.message || "Some error occurred while join group."
        })
    })
}