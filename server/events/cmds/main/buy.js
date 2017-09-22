module.exports = function (app) {
    return new buy(app);
};

var buy = function (client) {
    this.client = client;
};

buy.prototype.before = async function () {
    console.log('before buy');
};

buy.prototype.do = async function (fn) {
    this.money = this.money ? this.money : Math.round(Math.random() * 99 + 1);
    console.log('buy', this.money);
    fn(this.money);
};

buy.prototype.after = async function () {
    console.log('after buy');
};