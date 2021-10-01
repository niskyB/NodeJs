const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

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
    const error = validate(req.body);
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
    const error = validate(req.body);
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
            if (err || customer === null) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

module.exports = router;