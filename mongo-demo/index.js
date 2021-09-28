const mongoosse = require('mongoose');

mongoosse.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Could not connect to mongodb...', err));