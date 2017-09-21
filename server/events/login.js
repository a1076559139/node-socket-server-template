module.exports = function (client) {
    return new login(client);
};

var login = function (client) {
    this.client = client;
};

login.prototype.before = function () {
    console.log('before login');
};

login.prototype.do = function () {
    console.log('login', this.client.id);
};

login.prototype.after = function () {
    console.log('after login');
};