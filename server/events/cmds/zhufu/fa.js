module.exports = function (app) {
    return new fa(app);
};
/**
 * @param {SocketIO.Socket} client 
 */
var fa = function (client) {
    this.client = client;
};

fa.prototype.before = async function (data, fn) {
    if (!type.Object.isObject(data) || !data.name || !data.text) {
        return false;
    }
    if (!type.String.isString(data.name) || !type.String.isString(data.text)) {
        return false;
    }
    if (data.name.length > 10 || data.text.length > 200) {
        return false;
    }
};

fa.prototype.do = async function (data, fn) {
    this.client.broadcast.emit('shouZhuFu', data);
    await libs.db.zhuFu.putZhuFu(JSON.stringify(data));
};