const config = require('./../config');
const Redis = require('redis');
//     client = redis.createClient({
//         //ip地址localhost
//         host: 'localhost',
//         //端口6379
//         port: 6379,
//         //0库
//         db: 0,
//         //超时时间10秒,10秒后redis不会自动重连
//         // connect_timeout: 10000
//     });

const redis = Redis.createClient(config.redis);
redis.on('connect', function () {
    console.log('redis content success');
});
redis.on('error', function (err) {
    console.log('redis content err %j', err);
});

module.exports.getClient = function () {
    return redis;
};