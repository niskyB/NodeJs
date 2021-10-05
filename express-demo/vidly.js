require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

require('./startup/routes')(app);

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
})

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
})

winston.add(new winston.transports.File({ filename: 'logfile.log', useUnifiedTopology: true }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/playground', useUnifiedTopology: true }));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connect to mongodb'))
    .catch(err => console.error('Could not connect to mongodb...', err));

app.use(express.json());



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});