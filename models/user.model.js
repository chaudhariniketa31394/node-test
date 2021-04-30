const mongoose = require('mongoose');
let Mongoose = mongoose.Schema;
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: Mongoose.Types.ObjectId,
        ref: 'UserType',
        required: true
    },
    products: [{
        type: Mongoose.Types.ObjectId,
        ref: 'Product',
    }],

});



module.exports = mongoose.model('User', userSchema);