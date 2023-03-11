const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')
const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        minlength: 3,
        maxlength: 10,
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        minlength: 3,
        maxlength: 20,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', Userschema)