const mongoose = require('mongoose');

var userTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }

});



module.exports = mongoose.model('UserType', userTypeSchema);