const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    }
}));

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:_id', async(req, res) => {
    await Genre.findById(req.params._id, (err, genre) => {
            if (err || genre === null) return res.status(404).send(`The genre with the given ID was not found.`);
            else res.send(genre);
        })
        .catch(err => {});
});

router.post('/', async(req, res) => {
    const error = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    try {
        const result = await genre.save();
        console.log(result);
        res.send(result);
    } catch (ex) {
        for (field in er.errors)
            console.log(er.errors[field].message);
    }
});

router.put('/:_id', async(req, res) => {
    const error = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await Genre.findByIdAndUpdate(req.params._id, { name: req.body.name }, { new: true }, (err, genre) => {
            if (err || genre === null) return res.status(404).send(`The genre with the given ID was not found.`);
            else res.send(genre);
        })
        .catch((err) => {});
});

router.delete('/:_id', async(req, res) => {
    await Genre.findByIdAndRemove(req.params._id, (err, genre) => {
            if (err || genre === null) return res.status(404).send(`The genre with the given ID was not found.`);
            else res.send(genre);
        })
        .catch(err => {})

});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(genre);
    return error;
}

module.exports = router;