module.exports = function (app) {
    return new fa(app);
};

var fa = function (client) {
    this.client = client;
};

fa.prototype.before = async function (data) {
    if (!type.Object.isObject(data) || !data.name || !data.text) {
        return false;
    }
};

fa.prototype.do = async function (data) {
    io.emit('shouZhuFu', data);
    await libs.db.zhuFu.putZhuFu(JSON.stringify(data));
};