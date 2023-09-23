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

// Update a Part with the specified id in the request.
exports.updatePart = (req, res) => {
    const partId = req.params.partId;

    Part.update(req.body, {
        where: { id: partId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Part was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Part with id=${partId}. Maybe Part was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err || "Error updating part with id=" + partId
        });
    });
};

// Clone one part by id.
exports.clonePart = (req, res) => {
    const partId = req.params.partId;
    Part.findOne({
        where: { id: partId },
        raw: true
    })
    .then(data => {
        delete data.id;
        Part.create(data);
        console.log('data: ', data)
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send({
            part:
                err.message || "Some error occurred while finding your part.",
        });
    });
};

// Delete a Part with the specified id in the request.
exports.delete = (req, res) => {
    const partId = req.params.partId;

    Part.destroy({
      where: { id: partId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Part was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete part with id=${partId}. Maybe part was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            message: 
                err || "Could not delete part with id=" + partId
        });
      });
};