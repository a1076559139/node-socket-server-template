/************************************************************
RML客户端
************************************************************/
const config = require('./config');

/**
 * let rml = createServer();
 * rml.on('message',function(msg,cb){ console.log(msg); cb(); });
 */
exports.createServer = function (cb) {
	let rml = require('redis-msg-list').createServer(config.rml_server.key, config.rml_server.redis);

	rml.on('close', function (err) {
		console.log('Rml %s %j close: %s', config.rml_server.key, config.rml_server.redis, err);
	});

	rml.on('error', function (err) {
		console.log('Rml %s %j error: %s', config.rml_server.key, config.rml_server.redis, err);
	});

	rml.on('connect', function () {
		console.log('Rml %s %j connected.', config.rml_server.key, config.rml_server.redis);
	});

	// rml.on('message', async function (msg, callback) {
	// 	// todo
	// 	await cb(msg);
	// 	callback();
	// });

	client.listen(1);

	return client;
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