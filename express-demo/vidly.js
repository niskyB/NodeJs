const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const movies = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
];

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/api/genres', (req, res) => {
    res.send(movies);
});

app.get('/api/genres/:id', (req, res) => {
    const movie = movies.find(m => parseInt(req.params.id) === m.id);
    if (!movie) return res.status(404).send(`The movie with the given ID was not found.`);
    res.send(movie);
});

app.post('/api/genres', (req, res) => {
    const error = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const movie = {
        id: movies.length + 1,
        title: req.body.title,
    }

    movies.push(movie);
    res.send(movie);
});

app.put('/api/genres/:id', (req, res) => {
    const movie = movies.find(m => parseInt(req.params.id) === m.id);
    if (!movie) return res.status(404).send(`The movie with the given ID was not found.`);

    const error = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    movie.title = req.body.title;
    res.send(movie);
});

app.delete('/api/genres/:id', (req, res) => {
    const movie = movies.find(m => parseInt(req.params.id) === m.id);
    if (!movie) return res.status(404).send(`The movie with the given ID was not found.`);

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);
});

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    });

    const { error } = schema.validate(movie);
    return error;
}