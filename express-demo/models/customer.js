const Joi = require('joi');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    phone: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 11
    },
    isGold: {
        type: Boolean,
        required: true
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(6).max(11).required(),
        isGold: Joi.boolean().required()
    });

    const { error } = schema.validate(customer);
    return error;
}

exports.Customer = Customer;
exports.validate = validateCustomer;