module.exports = function (app) {
    return new error(app);
};

var error = function (client) {
    this.client = client;
};

error.prototype.before = function () {

};

error.prototype.do = function () {
    console.log('error');
};

error.prototype.after = function () {

};