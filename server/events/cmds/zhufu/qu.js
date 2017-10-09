module.exports = function (app) {
    return new qu(app);
};
/**
 * @param {SocketIO.Socket} client 
 */
var qu = function (client) {
    this.client = client;
};

qu.prototype.do = async function (fn) {
    fn(await libs.db.zhuFu.getZhuFu());
};