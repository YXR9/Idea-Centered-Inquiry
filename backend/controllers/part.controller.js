const db = require('../models');

// Assigning levels to the variable Part
const Activity = db.Activity;
const Part = db.Part;
const ActivityPart = db.ActivityPart;
const SubPart = db.SubPart;
const Op = db.Sequelize.Op;

// Create and Save new Part.
exports.create = async (req, res) => {
    const { title, activityId } = req.body;

    try {
        const part = await Part.create({
            title: title,
            activityId: activityId
        });
        await ActivityPart.create({
            ActivityId: activityId,
            PartId: part.id
        })

        console.log('Created part:', part);
        res.status(200).send({
            message: 'Part created successfully',
            part: part
        });
    } catch (err) {
        console.log('Error while creating part:', err);
        res.status(500).send({
            message: 'Error while creating part',
            error: err.message
        });
    }
};

// Find all parts by activityId.
exports.findAllPart = (req, res) => {
    const activityId = req.body.activityId;

    Activity.findAll({
            where: {
                id: activityId
            },
            include: [{
                model: Part,
                include: [{
                    model: ActivityPart,
                    include: [{
                        model: SubPart,
                        through: { attributes: [] }
                    }],
                    Part
                }]
            }]
        })
        .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find part with id=${activityId}.`
              });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: 
                err.message || "Error retrieving part with id=" + activityId,
            });
        });
};