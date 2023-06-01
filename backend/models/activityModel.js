const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid')

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

const activitySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    activityTitle: {
        type: String,
        require: true
    },
    activityInfo: {
        type: String,
    },
    activityKey: {
        type: String,
        // default: nanoid(5),
        index: { unique: true },
    },
    activityParts: [{
        title: String,
        info: String,
        reflection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reflection'
        }
    }],
    groups: [{
        groupKey: {
            type: String,
            default: nanoid(),
            index: { unique: true }
        },
        groupName: String,
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
    }],
    date: {
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Activity', activitySchema);