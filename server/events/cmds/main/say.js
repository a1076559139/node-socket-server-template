module.exports = function (app) {
    return new say(app);
};

var say = function (client) {
    this.client = client;
};

say.prototype.before = function () {

};

say.prototype.do = function () {

};

say.prototype.after = function () {

};