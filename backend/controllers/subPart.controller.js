const db = require('../models');

// Assigning levels to the variable SubPart
const SubPart = db.SubPart;
const ActivityPartSubPart = db.ActivityPartSubPart;
const Op = db.Sequelize.Op;

// Create and Save new Part.
exports.create = async (req, res) => {
    const { title, content, complete, partId } = req.body;

    try {
        const subPart = await SubPart.create({
            title: title,
            content: content,
            complete: complete,
            partId: partId
        });
        await ActivityPartSubPart.create({
            SubPartId: subPart.id,
            ActivityPartId: partId
        })

        console.log('Created SubPart:', subPart);
        res.status(200).send({
            message: 'SubPart created successfully',
            part: subPart
        });
    } catch (err) {
        console.log('Error while creating SubPart:', err);
        res.status(500).send({
            message: 'Error while creating SubPart',
            error: err.message
        });
    }
};

// Clone one subPart by id.
exports.cloneSubPart = (req, res) => {
    const subPartId = req.params.subPartId;
    SubPart.findOne({
        where: { id: subPartId },
        raw: true
    })
    .then(data => {
        delete data.id;
        SubPart.create(data);
        console.log('data: ', data)
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send({
            subPart:
                err.message || "Some error occurred while finding your subPart.",
        });
    });
}

// Update a SubPart with the specified id in the request.
exports.updateSubPart = (req, res) => {
    const subPartId = req.params.subPartId;

    SubPart.update(req.body, {
        where: { id: subPartId }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "SubPart was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update SubPart with id=${subPartId}. Maybe SubPart was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err || "Error updating SubPart with id=" + subPartId
        });
    });
}

// Delete a SubPart with the specified id in the request.
exports.delete = (req, res) => {
    const subPartId = req.params.subPartId;

    SubPart.destroy({
      where: { id: subPartId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "SubPart was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete SubPart with id=${subPartId}. Maybe SubPart was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
            message: 
                err || "Could not delete SubPart with id=" + subPartId
        });
      });
};