module.exports = function (app) {
    return new fa(app);
};

var fa = function (client) {
    this.client = client;
};

fa.prototype.before = async function (data, fn, cb) {
    console.log('fa data %j', data);
    if (!type.Object.isObject(data) || !data.name || !data.text) {
        return cb(null, false);
    }
    if (!type.String.isString(data.name) || !type.String.isString(data.text)) {
        return cb(null, false);
    }
    if (data.name.length > 10 || data.text.length > 200) {
        return cb(null, false);
    }
};

fa.prototype.do = async function (data, fn, cb) {
    this.client.broadcast.emit('shouZhuFu', data);
    await awaitDoErr(__filename, libs.db.zhuFu, 'putZhuFu', JSON.stringify(data));
    cb(null);
};