module.exports = function (app) {
    return new error(app);
};

var error = function (client) {
    this.client = client;
};

error.prototype.before = function () {
    console.log('before error');
};

error.prototype.do = function () {
    console.log('error');
};

error.prototype.after = function () {
    console.log('after error');
};