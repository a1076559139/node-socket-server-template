module.exports = function (client) {
    client.UserData = {};
    client.setUserData = function (k, v) {
        this.setUserData[k] = v;
    };
    client.getUserData = function (k) {
        return this.setUserData[k];
    };
};