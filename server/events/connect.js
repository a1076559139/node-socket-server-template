module.exports = function (client) {
    return new connect(client);
};
/**
 * @param {SocketIO.Socket} client 
 */
var connect = function (client) {
    this.client = client;
};

connect.prototype.before = async function () {
    // // 获取url参数
    // let query = this.client.handshake.query;
    // this.query = query;
};

connect.prototype.do = async function () {
    // // 加入房间
    // this.client.join(this.query.room);

    // // 房间广播
    // this.client.to(this.query.room).broadcast.emit('ll', this.client.id);

    // // 存储用户数据
    // this.client.setUserData('data', '123456');

    // // 开关用户定时器
    // let f = function (dt) {
    //     console.log('dt', dt);
    // }
    // let id = this.client.schedule(f, 2000);
    // this.client.unschedule(id);
    // this.client.unschedule(f);
    
    // // 开关全局定时器
    // let f = function (dt) {
    //     console.log('dt', dt);
    // }
    // let id = io.schedule(f, 2000);
    // io.unschedule(id);
    // io.unschedule(f);
};

connect.prototype.after = async function () {
    // 读取用户数据
    // let room = this.client.getUserData('data');
};