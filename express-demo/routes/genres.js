const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

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

router.post('/', auth, async(req, res) => {
    const error = validate(req.body);
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

router.put('/:_id', auth, async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await Genre.findByIdAndUpdate(req.params._id, { name: req.body.name }, { new: true }, (err, genre) => {
            if (err || genre === null) return res.status(404).send(`The genre with the given ID was not found.`);
            else res.send(genre);
        })
        .catch((err) => {});
});

router.delete('/:_id', [auth, admin], async(req, res) => {
    await Genre.findByIdAndRemove(req.params._id, (err, genre) => {
            if (err || genre === null) return res.status(404).send(`The genre with the given ID was not found.`);
            else res.send(genre);
        })
        .catch(err => {})

});

module.exports = router;