global.config = require('./config');

global.io = require('./server');
console.log('server start');

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err.stack);
});