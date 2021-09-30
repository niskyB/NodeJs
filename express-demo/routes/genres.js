const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    }
}));

const movies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
];

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:_id', async(req, res) => {
    await Movie.findById(req.params._id, (err, movie) => {
            if (err) return res.status(404).send(`The movie with the given ID was not found.`);
            else res.send(movie);
        })
        .catch(err => {});
});

router.post('/', async(req, res) => {
    const error = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = new Movie({
        name: req.body.title
    });

    try {
        const result = await movie.save();
        console.log(result);
        res.send(result);
    } catch (ex) {
        for (field in er.errors)
            console.log(er.errors[field].message);
    }
});

router.put('/:_id', async(req, res) => {
    const error = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await Movie.findByIdAndUpdate(req.params._id, { name: req.body.title }, { new: true }, (err, movie) => {
            if (err) return res.status(404).send(`The movie with the given ID was not found.`);
            else res.send(movie);
        })
        .catch((err) => {});
});

router.delete('/:_id', async(req, res) => {
    await Movie.findByIdAndRemove(req.params._id, (err, movie) => {
            if (err) return res.status(404).send(`The movie with the given ID was not found.`);
            else res.send(movie);
        })
        .catch(err => {})

});

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    });

    const { error } = schema.validate(movie);
    return error;
}

module.exports = router;