module.exports = function (app) {
    return new disconnect(app);
};

var disconnect = function (client) {
    this.client = client;
};

disconnect.prototype.before = async function () {
    console.log('before disconnect');
};

disconnect.prototype.do = async function () {
    console.log('disconnect');
};

disconnect.prototype.after = async function () {
    console.log('after disconnect');
};