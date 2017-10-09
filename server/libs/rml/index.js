/************************************************************
RML客户端
************************************************************/
const config = require('./config');
const util = require('util');
/**
 * let rml = createServer(async function (msg) { console.log(msg); });//一定要使用同步模式，一定不允许存在老的异步回掉
 */

exports.createServer = function (cb) {
    let rml = require('redis-msg-list').createServer(config.rml_server.key, config.rml_server.redis);

    rml.on('close', function (err) {
        console.log(util.format('Rml %s %j close: %s', config.rml_server.key, config.rml_server.redis, err));
    });

    rml.on('error', function (err) {
        console.log(util.format('Rml %s %j error: %s', config.rml_server.key, config.rml_server.redis, err));
    });

    rml.on('connect', function () {
        console.log(util.format('Rml %s %j connected', config.rml_server.key, config.rml_server.redis));
    });

    rml.on('message', async function (msg, callback) {
        // todo
        console.log(util.format('Rml onmessage %j', msg));
        try {
            await cb(msg);
        } catch (e) {
            console.error('Rml onmessage %s', msg);
        }
        callback();
    });

    rml.listen(1);

    return rml;
};

/**
 * let rml = createClient();
 * rml.send(msg);
 */
exports.createClient = function () {
    let rml = require('redis-msg-list').createClient(config.rml_client.key, config.rml_client.redis);

    rml.on('close', function (err) {
        console.log('Rml %s %j close: %s', config.rml_client.key, config.rml_client.redis, err);
    });

    rml.on('error', function (err) {
        console.log('Rml %s %j error: %s', config.rml_client.key, config.rml_client.redis, err);
    });

    rml.on('connect', function () {
        console.log('Rml %s %j connected.', config.rml_client.key, config.rml_client.redis);
    });

    return rml;
};