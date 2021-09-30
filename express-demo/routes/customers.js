const express = require('express');
const Joi = require('joi');
const router = express.Router();
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

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:_id', async(req, res) => {
    await Customer.findById(req.params._id, (err, customer) => {
            if (err || customer === null) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

router.post('/', async(req, res) => {
    const error = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    try {
        const result = await customer.save();
        res.send(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
});

router.put('/:_id', async(req, res) => {
    const error = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await Customer.findByIdAndUpdate(req.params._id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }, { new: true }, (err, customer) => {
            if (err) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

router.delete('/:_id', async(req, res) => {
    await Customer.findByIdAndDelete(req.params._id, (err, customer) => {
            if (err) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(6).max(11).required(),
        isGold: Joi.boolean().required()
    });

    const { error } = schema.validate(customer);
    return error;
}

module.exports = router;