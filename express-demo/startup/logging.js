const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
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
}