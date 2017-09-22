const redis = require('socket.io-redis');
const adapter = redis(config.adapter);
adapter.pubClient.on('connect', function () {
    console.log('pubClient connect');
});
adapter.pubClient.on('error', function () {
    console.log('pubClient error');
});
adapter.pubClient.on('close', function () {
    console.log('pubClient close');
});

adapter.subClient.on('connect', function () {
    console.log('subClient connect');
});
adapter.subClient.on('error', function () {
    console.log('subClient error');
});
adapter.subClient.on('close', function () {
    console.log('subClient close');
});

module.exports = adapter;

/**
 * 使用redis集群
 */
// var Redis = require('ioredis');

// var cluster = new Redis.Cluster([{
//     port: 6379,
//     host: 'localhost'
// }, {
//     port: 6380,
//     host: 'localhost'
// }]);
// module.exports = cluster;

// cluster.set('foo', 'bar');
// cluster.get('foo', function (err, res) {
//     console.log(err, res);
// });
