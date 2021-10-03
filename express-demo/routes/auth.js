const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Ivalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Ivalid email or password.');

    res.send(true);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(0).email().required(),
        password: Joi.string().min(6).max(250).required()
    });

    const { error } = schema.validate(req);
    return error;
}

module.exports = router;