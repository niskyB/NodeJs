const _ = require('lodash');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:_id', async(req, res) => {
    await Movie.findById(req.params._id, (err, movie) => {
            if (err || movie === null) return res.status(404).send("The moive with the given ID was not found.");
            else res.send(movie);
        })
        .catch(err => {});
});

router.post('/', auth, async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId)
        .catch(err => null);
    if (!genre) return res.status(404).send('Invalid genre')

    const movie = new Movie(_.pick(req.body, ['title', 'numberInStock', 'dailyRentalRate']));
    movie.genre = _.pick(genre, ['_id', 'name']);

    try {
        const result = await movie.save();
        res.send(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
});

router.put('/:_id', auth, async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre');

    await Movie.findByIdAndUpdate(req.params._id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true }, (err, movie) => {
            if (err || movie === null) return res.status(404).send("The moive with the given ID was not found.");
            else res.send(movie);
        })
        .catch(err => {});
});

router.delete('/:_id', auth, async(req, res) => {
    await Movie.findByIdAndRemove(req.params._id, (err, movie) => {
            if (err || movie === null) return res.status(404).send("The moive with the given ID was not found.");
            else res.send(movie);
        })
        .catch(err => {});
});

module.exports = router;