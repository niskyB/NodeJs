const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:_id', async(req, res) => {
    await Rental.findById(req.params.id, (err, rental) => {
            if (err) return res.status(404).send('The rental with the given ID was not found.');
            else res.send(rental);
        })
        .catch(err => {});
});

router.post('/', async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId)
        .catch(err => null);
    if (!customer) return res.status(404).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId)
        .catch(err => null);
    if (!movie) return res.status(404).send('Invalid movie');

    if (movie.numberInStock === 0) return res.status(400).send('Movie is not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

router.put('/:_id', async(req, res) => {

});

router.delete('/:_id', async(req, res) => {

});

module.exports = router;