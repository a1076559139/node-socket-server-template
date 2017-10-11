module.exports = function (obj) {
    obj.ownData = {};
    obj.setData = function (k, v) {
        this.ownData[k] = v;
    };
    obj.getData = function (k) {
        return this.ownData[k];
    };
};