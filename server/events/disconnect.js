module.exports = function (app) {
    return new disconnect(app);
};

var disconnect = function (client) {
    this.client = client;
};

disconnect.prototype.before = async function (cb) {
    cb(null);
};

disconnect.prototype.do = async function () {
};

disconnect.prototype.after = async function () {
};