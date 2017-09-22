module.exports = function (app) {
    return new error(app);
};

var error = function (client) {
    this.client = client;
};

error.prototype.before = async function () {
    console.log('before error');
};

error.prototype.do = async function () {
    console.log('error');
};

error.prototype.after = async function () {
    console.log('after error');
};