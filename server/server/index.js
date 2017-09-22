const bindEvents = require('./bindEvents');
const bindSchedule = require('./bindSchedule');
const bindUserData = require('./bindUserData');

const io = require('socket.io')();
io.adapter(require('./adapter'));

io.on('connection', async function (client) {
    /**
     * 绑定用户events
     * 
     * 为client添加UserEvents属性并自动on事件
     */
    bindEvents(client);

    bindSchedule(client);

    /**
     * 绑定用户数据存取
     * 
     * 为client添加UserData属性及setUserData和getUserData方法
     */
    bindUserData(client);

    /**
     * 手动调用触发connect事件
     */
    client.listeners('connect')[0].call(client);

    global.client = client;
});
io.listen(config.server.port, config.server.serverOptions);

module.exports = io;