module.exports = function (app) {
    return new error(app);
};

var error = function (client) {
    this.client = client;
};

error.prototype.before = async function () {
};

error.prototype.do = async function () {
};

error.prototype.after = async function () {
};