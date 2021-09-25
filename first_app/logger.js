const EventEmitter = require('events'); // EventEmitter là class vì require trả về 1 class

// console.log(__filename);
// console.log(__dirname);
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP request
        console.log(message);
        this.emit('messageLogged', { id: 1, url: 'http://' }); // raise an event
    }
}



module.exports = Logger;
// module.exports.endPoint = url;