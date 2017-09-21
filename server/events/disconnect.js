module.exports = function (app) {
    return new disconnect(app);
};

var disconnect = function (client) {
    this.client = client;
};

disconnect.prototype.before = function () {

};

disconnect.prototype.do = function () {
    console.log('disconnect');
};

disconnect.prototype.after = function () {

};