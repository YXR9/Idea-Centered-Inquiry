const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    activityTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity'
    },
    groupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    nodeType: {
        type: String,
        enum: ["想法", "資訊", "提問"],
        default: "想法",
    },
    nodeTitle: {
        type: String,
        require: true
    },
    nodeContent: {
        type: String
    }
})

module.exports = mongoose.model('Node', nodeSchema);