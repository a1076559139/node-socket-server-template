module.exports = function (client) {
    return new disconnect(client);
};
/**
 * @param {SocketIO.Socket} client 
 */
var disconnect = function (client) {
    this.client = client;
};

disconnect.prototype.before = async function () {
};

disconnect.prototype.do = async function () {
};

disconnect.prototype.after = async function () {
};