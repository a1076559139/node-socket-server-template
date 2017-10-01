

module.exports = function () {
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
    return adapter;
};

/**
 * 使用redis集群
 */
// const Redis = require('ioredis');

// const cluster = new Redis.Cluster(config.adapter);

// cluster.on('error', function (err) {
//     console.log('cluster error ' + err);
//     console.log('cluster node error', err.lastNodeError);
// });

// const redis = require('socket.io-redis');
// module.exports = redis({ pubClient: cluster, subClient: cluster });