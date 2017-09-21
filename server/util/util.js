/**********************************************************
通用工具模块
**********************************************************/

var util = {
    /**
     * [copy 深度复制一个对象] --------- 深拷贝直接用Object.assign
     * @param {Object|Array} ms     []
     * @return {Object|Array}       []
     */
    // copy: function (o) {
    //     var s = JSON.stringify(o);
    //     return JSON.parse(s);
    // },

    /**
     * [formatTime 返回由毫秒数，格式化得到的形如[天,小时,分钟,秒,毫秒]的数组]
     * @param {Number} ms   [毫秒值]
     * @return {[]}     [天,小时,分钟,秒,毫秒]
     */
    formatTime: function (ms) {
        var a = [0, 0, 0, 0, 0];
        a[4] = ms % 1000;
        a[3] = parseInt(ms / 1000);
        if (a[3] >= 60) {
            a[2] = parseInt(a[3] / 60);
            a[3] = a[3] % 60;
            if (a[2] >= 60) {
                a[1] = parseInt(a[2] / 60);
                a[2] = a[2] % 60;
                if (a[1] >= 24) {
                    a[0] = parseInt(a[1] / 24);
                    a[1] = a[1] % 24;
                }
            }
        }
        return a;
    },

    /**
     * [formatTimeToString 将毫秒转成时间]
     * @param {Number} ms   [毫秒值]
     * @param {Number} ms   [模式]
     * @return {String}     [1天3小时6分钟30秒] | [00:00:00]
     */
    formatTimeToString: function (ms, mod) {
        var time = this.formatTime(ms);

        if (!mod) {
            for (var i in time) {
                time[i] < 10 ? (time[i] = '0' + time[i]) : null;
            }
            if (time[0] > 0) {
                return time[0] + ':' + time[1] + ':' + time[2] + ':' + time[3];
            }
            return time[1] + ':' + time[2] + ':' + time[3];
        } else {
            var d = time[0] > 0 ? time[0] + '天' : '';
            var h = time[1] > 0 ? time[1] + '时' : '';
            var m = time[2] > 0 ? time[2] + '分' : '';
            var s = time[3] > 0 ? time[3] + '秒' : '';

            var total = time[0] + time[1] + time[2] + time[3];

            if (time[1] === total) {
                h = time[1] + '小时';
            } else if (time[2] === total) {
                m = time[2] + '分钟';
            }

            return d + h + m + s;
        }
    },

    /**
     * [getTime 返回指定毫秒的日期时间字符串]
     * @param  {[String]} ms    [毫秒]
     * @param  {[String]} m     [0-仅时间,1-仅日期,2-日期时间]
     * @param  {[String]} s     [日期样式]
     * @return {[String]}       [日期]
     */
    getTime: function (ms, m, s) {
        var ds = '';
        var ts = '';
        var d = new Date(ms);
        if (s == 1) {
            ds += d.getFullYear() + '/';
            ds += this.fixLength(d.getMonth() + 1, 2) + '/';
            ds += this.fixLength(d.getDate(), 2);
        } else if (s == 2) {
            ds += d.getFullYear() + '-';
            ds += this.fixLength(d.getMonth() + 1, 2) + '-';
            ds += this.fixLength(d.getDate(), 2);
        } else {
            ds += d.getFullYear() + '年';
            ds += this.fixLength(d.getMonth() + 1, 2) + '月';
            ds += this.fixLength(d.getDate(), 2) + '日';
        }
        ts += this.fixLength(d.getHours(), 2) + ':';
        ts += this.fixLength(d.getMinutes(), 2) + ':';
        ts += this.fixLength(d.getSeconds(), 2);
        switch (m) {
            case 1:
                return ds;
            case 2:
                return ds + ' ' + ts;
            default:
                return ts;
        }
    },

    /**
     * [getByteLen 得到给定字符串的字节长度]
     * @param  {[String]} str [字符串]
     * @return {[Number]}     [字节长度]
     */
    getByteLen: function (str) {
        var byteLen = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) {
                byteLen += 2;
            } else {
                byteLen++;
            }
        }
        return byteLen;
    },

    /**
     * [cutString 截取指定字节数]
     * @param  {[String]} str    [字符串]
     * @param  {[Number]} len    [截取字节数]
     * @param  {[String]} suffix [替换字]
     * @return {[String]}        [截取后的字符串]
     */
    cutString: function (str, len, suffix) {
        if (!str) return '';
        if (len <= 0) return '';
        if (!suffix) suffix = '';
        var templen = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 255) {
                templen += 2;
            } else {
                templen++;
            }
            if (templen == len) {
                i++;
                break;
            } else if (templen > len) {
                break;
            }
        }
        return str.substr(0, i) + (i < str.length ? suffix : '');
    },

    /**
     * [getPointAlpha 得到指定图源某点的透明度]
     * @param  {[Image]}  img [图源]
     * @param  {[Number]} x   [点的X坐标]
     * @param  {[Number]} y   [点的Y坐标]
     * @return {[Number]}     [指定点的透明度(0-255)]
     */
    // getPointAlpha: function (img, x, y) {
    //     var cvs = window.document.createElement('canvas');
    //     var ctx = cvs.getContext('2d');
    //     cvs.width = 1;
    //     cvs.height = 1;
    //     ctx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
    //     var imgdata = ctx.getImageData(0, 0, 1, 1);

    //     return imgdata.data[3];
    // },

    /**
     * [getQueryString 获取Url中指定的参数]
     * @param  {[String]} name [参数名]
     * @return {[String]}      [指定参数的值，没有则返回null]
     */
    // getQueryString: function (name, search) {
    //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) return unescape(r[2]);
    //     return null;
    // },

    /**
     * [quickSort 快速排序]
     * @param  {[Array]} arr        [数组]
     * @param  {[Function]} cb      [判断回掉(值1, 值2)]
     * @return {[Array]}            [排好序的数组]
     */
    quickSort: function (arr, cb) {
        //如果数组<=1,则直接返回
        if (arr.length <= 1) { return arr; }
        let pivotIndex = Math.floor(arr.length / 2);
        //找基准
        let pivot = arr[pivotIndex];
        //定义左右数组
        let left = [];
        let right = [];

        //比基准小的放在left，比基准大的放在right
        for (let i = 0; i < arr.length; i++) {
            if (i !== pivotIndex) {
                if (cb) {
                    if (cb(arr[i], pivot)) {
                        left.push(arr[i]);
                    } else {
                        right.push(arr[i]);
                    }
                } else {
                    if (arr[i] <= pivot) {
                        left.push(arr[i]);
                    } else {
                        right.push(arr[i]);
                    }
                }
            }
        }
        //递归
        return util.quickSort(left, cb).concat([pivot], util.quickSort(right, cb));
    },

    /**
     * [quickSortIndex 快速排序(返回下标)]
     * @param  {[Number]} length     [数组大小]
     * @param  {[Function]} cb      [判断回掉(下标1, 下标2)]
     * @return {[Array]}            [排好序的数组下标]
     */
    quickSortIndex: function (length, cb) {
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(i);
        }
        return util.quickSort(arr, cb);
    }
};


module.exports = util;