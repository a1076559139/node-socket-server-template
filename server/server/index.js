const bindEvents = require('./bindEvents');
const bindSchedule = require('./bindSchedule');
const bindOwnData = require('./bindOwnData');

// const Namespace = require('./../node_modules/socket.io/lib/namespace');
// bindSchedule(Namespace.prototype);

const io = require('socket.io')();
// io.adapter(require('./adapter')());

io.use(function (socket, next) {
    next();
    // next('非法链接');
});

io.on('connection', function (socket) {
    /**
     * 验证非法消息
     */
    // socket.use((packet, next) => {
    //     // if (packet.doge === true) return next();
    //     // next(new Error('Not a doge error'));
    // });
    /**
     * 绑定用户events
     * 
     * 为socket添加UserEvents属性并自动on事件
     */
    bindEvents(socket);

    /**
     * 绑定定时器方法
     * 
     * 为socket添加定时器方法
     */
    bindSchedule(socket);

    /**
     * 绑定用户数据存取
     * 
     * 为socket添加UserData属性及setUserData和getUserData方法
     */
    bindOwnData(socket);

    /**
     * 手动调用触发connect事件
     */
    socket.listeners('connect')[0].call(socket);
});
bindSchedule(io);
bindOwnData(io);
io.listen(config.server.port, config.server.serverOptions);
module.exports = io;