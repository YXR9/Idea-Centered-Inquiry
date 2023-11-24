const db = require('../models');

const Edge = db.Edge;
const Op = db.Sequelize.Op;

// Create and Save new Edge.
exports.create = async (req, res) => {
    const { groupId, from, to } = req.body;

    try {
        const edge = await Edge.create({
            groupId: groupId,
            from: from,
            to: to
        });

        console.log('Created edge:', edge);
        res.status(200).send({
            message: 'Edge created successfully',
            edge: edge
        });
    } catch (err) {
        console.log('Error while creating edge:', err);
        res.status(500).send({
            message: 'Error while creating edge',
            error: err.message
        });
    }
};

// Find all nodes by groupId.
// exports.findAllNode = (req, res) => {
//     const groupId = req.params.groupId;

//     Group.findAll({
//             where: {
//                 id: groupId
//             },
//             include: [{
//                 model: Node,
//                 through: { attributes: [] }
//             }],
            
//         })
//         .then(data => {
//             if (data) {
//               res.send(data);
//             } else {
//               res.status(404).send({
//                 message: `Cannot find group with id=${groupId}.`
//               });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//               message: 
//                 err.message || "Error retrieving group with id=" + groupId,
//             });
//         });
// };

// // Find a single node with an id.
// exports.findOneNode = (req, res) => {
//     const id = req.params.id;

//     Node.findByPk(id)
//         .then(data => {
//             if (data) {
//               res.send(data);
//             } else {
//               res.status(404).send({
//                 message: `Cannot find node with id=${id}.`
//               });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//               message: 
//                 err.message || "Error retrieving node with id=" + id,
//             });
//         });
// };

// exports.updateNode = (req, res) => {
//     const nodeId = req.params.nodeId;

//     Node.update(req.body, {
//         where: { id: nodeId }
//     })
//     .then(num => {
//         if (num == 1) {
//             res.status(200).send({
//                 message: "Node was updated successfully."
//             });
//         } else {
//             res.send({
//                 message: `Cannot update Node with id=${nodeId}. Maybe Node was not found or req.body is empty!`
//             });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: 
//                 err || "Error updating Node with id=" + nodeId
//         });
//     });
// }