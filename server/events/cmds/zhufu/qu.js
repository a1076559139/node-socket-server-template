module.exports = function (app) {
    return new qu(app);
};

var qu = function (client) {
    this.client = client;
};

qu.prototype.do = async function (fn, cb) {
    fn(await awaitDoErr(__filename, libs.db.zhuFu, 'getZhuFu'));
    cb(null);
};