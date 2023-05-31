const mongoose = require('mongoose');

const reflectionSchema = new mongoose.Schema({
    question: {
        type: String,
    }
})

module.exports = mongoose.model('Reflection', reflectionSchema);