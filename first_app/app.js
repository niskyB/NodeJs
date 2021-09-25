function hello(name) {
    console.log(name);
}

// hello('loc');
// console.log(window)

// console is global object
// setTimeout() is global object
// clearTimout() "" "" "" "" "" 
// setInterval() ''''''' ''
// clearInterval() "" "" "" "" 
// window là global object của browsers
// trong node ko có window object mà thay vào đó là global object
// console.log(module)

// const logger = require('./logger');
// logger.log('Hello cu');

// const path = require('path');
// var pathObj = path.parse(__filename);
// console.log(pathObj);

// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files)
// const files1 = fs.readdir('./', function(err, result) {
//     if (err)
//         console.log('Error', err);
//     else
//         console.log('Result', result);
// })

// const EventEmitter = require('events'); // EventEmitter là class vì require trả về 1 class
// const emitter = new EventEmitter();

// emitter.on('messageLogged', (arg) => { // register a listener
//     console.log('Listener called', arg);
// });

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// });

// logger.log('message');

// emitter.on('logging', (arg) => {
//     console.log('Logging: ', arg.data);
// });

// emitter.emit('logging', { data: 'logging successful' });

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});


server.listen(3000);

console.log('Listening on port 3000...');