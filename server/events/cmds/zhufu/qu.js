module.exports = function (client) {
    return new qu(client);
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