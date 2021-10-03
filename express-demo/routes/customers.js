const _ = require('lodash');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

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

router.post('/', auth, async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer(_.pick(req.body, ['name', 'phone', 'isGold']));
    try {
        const result = await customer.save();
        res.send(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
});

router.put('/:_id', auth, async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await Customer.findByIdAndUpdate(req.params._id, _.pick(req.body, ['name', 'phone', 'isGold']), { new: true }, (err, customer) => {
            if (err) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

router.delete('/:_id', auth, async(req, res) => {
    await Customer.findByIdAndDelete(req.params._id, (err, customer) => {
            if (err || customer === null) res.status(404).send('The customer with the given ID was not found.');
            else res.send(customer);
        })
        .catch(err => {});
});

module.exports = router;