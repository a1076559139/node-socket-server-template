module.exports = function (client) {
    return new connect(client);
};

var connect = function (client) {
    this.client = client;
};

connect.prototype.before = async function () {
    // console.log('before connect');
    // let query = this.client.handshake.query;
    // this.name = query.name;
};

connect.prototype.do = async function () {
    // let query = this.client.handshake.query;
    // console.log('connect', this.client.id);

    // // 加入房间
    // this.client.join(query.room);
    // // 房间广播
    // this.client.to(query.room).broadcast.emit('ll', this.client.id);
    // // 存储用户数据
    // this.client.setUserData('room', query.room);

    this.schedule(function (dt) {
        console.log('say', dt);
        this.client.emit('say', dt);
    }, 1000);
};

connect.prototype.after = async function () {
    // 读取用户数据
    // let room = this.client.getUserData('room');
    // console.log('after connect', room, this.name);
};