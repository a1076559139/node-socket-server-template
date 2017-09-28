module.exports = function (app) {
    return new fa(app);
};

var fa = function (client) {
    this.client = client;
};

fa.prototype.before = async function (data) {
    console.log('fa data %j', data);
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

fa.prototype.do = async function (data) {
    this.client.broadcast.emit('shouZhuFu', data);
    await libs.db.zhuFu.putZhuFu(JSON.stringify(data));
};