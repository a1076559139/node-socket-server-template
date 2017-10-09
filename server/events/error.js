module.exports = function (client) {
    return new error(client);
};
/**
 * @param {SocketIO.Socket} client 
 */
var error = function (client) {
    this.client = client;
};

error.prototype.before = async function () {
};

error.prototype.do = async function () {
};

error.prototype.after = async function () {
};