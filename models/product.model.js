const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
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
    },
    view: {
        type: Boolean,
        required: true,
        default: true

    }

});



module.exports = mongoose.model('Product', productSchema);