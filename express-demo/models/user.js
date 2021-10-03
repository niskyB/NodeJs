const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minLength: 0,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 6,
        maxLength: 250,
        required: true
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(0).email().required(),
        password: Joi.string().min(6).max(250).required()
    });

    const { error } = schema.validate(user);
    return error;
}

exports.User = User;
exports.validate = validateUser;