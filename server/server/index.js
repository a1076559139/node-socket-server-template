const bindEvents = require('./bindEvents');

const io = require('socket.io')();
io.adapter(require('./adapter'));

io.on('connection', async function (client) {
    // 用户数据存在这
    client.UserData = {};
    client.setUserData = function (k, v) {
        this.setUserData[k] = v;
    };
    client.getUserData = function (k) {
        return this.setUserData[k];
    };
    client.UserEvents = {};
    if (!client.UserEvents['open']) {
        client.UserEvents['open'] = new require('./../events/connect')(client)
    }
    // 调用connect
    let open = client.UserEvents['open'];
    open.before && await open.before();
    open.do && await open.do();
    open.after && await open.after();
    // 绑定events
    bindEvents(client);
});
io.listen(config.server.port, config.server.serverOptions);

module.exports = io;