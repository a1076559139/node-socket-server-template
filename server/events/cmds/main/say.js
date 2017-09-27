module.exports = function (app) {
    return new say(app);
};

var say = function (client) {
    this.client = client;
};

say.prototype.do = async function (data) {
    console.log('say', data);
    io.emit('say', data);
};