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