var array = {
    /**
     * 判断是否是对象
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    isArray: function (param) {
        return param instanceof Array;
    },
    /**
     * 将参数强转成数组格式,不带有length属性将返回null
     * 比如arguments, '123'
     * 
     * @param {any} param 
     * @param {Number} index 
     * @param {Number} count 
     * @returns {[]}
     */
    copyToArray: function (param, index, count) {
        try {
            param.length;
        } catch (e) { return null; }
        if (typeof param.length === 'undefined') {
            return null;
        }
        index = number.toInt(index) || 0;
        count = number.toInt(count) || undefined;
        return Array.prototype.slice.call(param, index, count);
    },
    /**
     * 判断是否是String数组
     * 
     * @param {[]} param 
     * @returns {Boolean}
     */
    isStringArray: function (param) {
        if (param instanceof Array && param.length > 0) {
            for (var i = 0; i < param.length; i++) {
                if (!string.isString(param[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    /**
     * 判断是否是Number数组
     * 
     * @param {[]} param 
     * @param {String} judge
     * @returns {Boolean}
     */
    isNumberArray: function (param, judge) {
        if (param instanceof Array && param.length > 0) {
            for (var i = 0; i < param.length; i++) {
                if (!number.isNumber(param[i], judge)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    /**
     * 数组随机打散,返回下标数组
     * 
     * @param {[]} array 
     * @returns {[]}
     */
    random: function (array, length) {
        if (this.isArray(array)) {
            //测试node版本v7.0.0 : 数组大小60，循环生成85万次耗时1秒
            if (!length || length < 0 || length > array.length) {
                length = array.length;
            }
            let a = [];
            for (let i = 0; i < array.length; i++) {
                a[i] = i;
            }
            for (let i = 0; i < length; i++) {
                let j = Math.floor(Math.random() * a.length);
                if (j !== i) {
                    let t = a[j];
                    a[j] = a[i];
                    a[i] = t;
                }
            }
            return length === array.length ? a : a.slice(0, length);
        } else {
            return null;
        }
    },
    /**
     * 快速排序
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
        return this.quickSort(left, cb).concat([pivot], this.quickSort(right, cb));
    }
};
var bool = {
    /**
     * 判断是否是bool类型
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    isBool: function (param) {
        return typeof param === 'boolean';
    },

    /**
     * 将参数转成bool
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    toBool: function (param) {
        return !!param;
    }
};
var fun = {
    /**
     * 判断是否是方法
     * 
     * @param {function} param 
     * @returns {Boolean}
     */
    isFunction: function (param) {
        return typeof param == 'function';
    }
};
var number = {

    /**
     * 判断是否是number型的数字或字符串
     * @param {String} param
     * @param {String} judge
     * @returns {Boolean}
     * 
     * exp:
     * isNumber(n);             //判断是否是数字
     * isNumber(n,'@ > 0');     //判断是否是数字并且>0
     * isNumber(n,'@ < 0');     //判断是否是数字并且<0
     * isNumber(n,'@ > 0 && @ < 100');
     * isNumber(n,'@ == 0');    //判断是否是数字并且==0
     * isNumber(n,'@ === 0');   //判断是否是数字并且===0
     * isNumber(n,'@ != 0');    //判断是否是数字并且!=0
     * isNumber(n,'@ !== 0');   //判断是否是数字并且!==0
     * isNumber(n,'@ > 100 ? "大于100" : "小于等于100"');
     * 
     *   .1    1.  01   01.         不是数字
     *   0.1  1.0   1   1.0   1.00  是数字
     */
    isNumber: function (param: any, judge?: any) {
        if (/^-?([1-9]\d*|[0-9])(\.\d+)?$/.test(param) || param == 0) {
            if (typeof judge === 'string') {
                judge = judge.replace(/@/g, param);
                return new Function('return ' + judge + ';')();
            } else if (judge === undefined) {
                return true;
            } else {
                throw 'judge must be string or undefined';
            }
        }
        return false;
    },

    /**
     * 判断是否是int型的数字或字符串
     * @param {any} param
     * @param {String} judge
     * @returns {Boolean}
     * 
     * exp:
     * isInt(1);        //true
     * isInt(1.0);      //true
     * isInt('1.0');    //false
     */
    isInt: function (param: any, judge?: string) {
        if (number.isNumber(param, judge) && param.toString().indexOf('.') === -1) {
            return true;
        }
        return false;
    },

    /**
     * 判断是否是float型的数字或字符串
     * @param {String} param
     * @param {String} judge
     * @returns {Boolean}
     * exp:
     * 
     * isFloat(1);        //false
     * isFloat(1.0);      //false
     * isFloat('1.0');    //true
     */
    isFloat: function (param: any, judge?: any) {
        if (number.isNumber(param, judge) && param.toString().indexOf('.') !== -1) {
            return true;
        }
        return false;
    },

    /**
     * 转成number
     * 
     * @param {String} param
     * @returns {Number}
     */
    toNumber: function (param) {
        var isnum = number.isNumber(param);
        return isnum === false ? null : Number.parseFloat(param);
    },

    /**
     * 转成int,非int型返回null
     * 
     * @param {String} param
     * @returns {Number}
     */
    toInt: function (param) {
        var isint = number.isInt(param);
        return isint === false ? null : Number.parseInt(param);
    },

    /**
     * 转成float,非float型返回null
     * 
     * @param {String} param
     * @returns {Number}
     */
    toFloat: function (param) {
        var isfloat = number.isFloat(param);
        return isfloat === false ? null : Number.parseFloat(param);
    },
    /**
     * 获得某一闭区间的随机数，可以指定小数点位数fixed，fixed有效时对结果4舍5入
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @param {Number} fixed 
     * @returns {Number}
     */
    random: function (min: number, max: number, fixed?: number) {
        min = number.toNumber(min);
        max = number.toNumber(max);
        fixed = number.toInt(fixed) || 0;
        if (min === null || max === null || min >= max || fixed < 0) {
            throw 'min or max is error param';
        }
        var n;
        if (fixed) {
            n = Math.random() * (max - min) + min;
            n = n.toFixed(fixed);
        } else {
            n = Math.random() * (max - min + 1) + min;
            n = Math.floor(n);
        }

        return number.toNumber(n);
    }
};
var object = {
    /**
     * 判断是否是对象
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    isObject: function (param) {
        return (typeof param === 'object') && !(param instanceof Array);
    },
    /**
     * 判断是否是空对象或数组
     * 
     * @param {Object} param
     * @returns {Boolean}
     */
    isEmpty: function (param) {
        if (object.isObject(param)) {
            for (var key in param) {
                if (param.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    /**
     * 获取对象或数组的长度
     * 
     * @param {Object} param 
     * @returns {Number}
     */
    getLength: function (param) {
        if (object.isObject(param)) {
            var i = 0;
            for (var key in param) {
                if (param.hasOwnProperty(key)) {
                    i++;
                }
            }
            return i;
        }
        return null;
    },
    /**
     * 判断对象内的key是否符合标准
     * 
     * @param {any} param 
     * @returns {error}
     */
    judge: function (object: object, judge: object) {
        if (this.isObject(object) && this.isObject(judge)) {
            for (var k in judge) {
                var key = judge[k];
                if (!TYPE[key] || !this[key]['is' + key](object[k])) {
                    return k + '必须是' + key + '类型，而非' + (typeof object[k]);
                }
            }
            return null;
        }
        return '传入的参数必须是两个对象:' + (typeof object) + ' ' + (typeof judge);
    },
    /**
     * 将对象内的key强转成指定类型
     * 
     * @param {any} param 
     * @returns {error}
     */
    transform: function (object: object, judge: object) {
        if (this.Object.isObject(object) && this.Object.isObject(judge)) {
            for (var k in judge) {
                var key = judge[k];
                if (TYPE[key]) {
                    try {
                        if (this[key]['is' + key](object[k])) {
                            object[k] = this[key]['to' + key](object[k]);
                        } else {
                            return '转换失败 ' + k + '不是' + key + '类型';
                        }
                    } catch (e) {
                        return '转换失败 ' + e.toString();
                    }
                }
            }
            return null;
        }
        return '传入的参数必须是两个对象:' + (typeof object) + ' ' + (typeof judge);
    }
};
var string = {
    /**
     * 判断是否是字符串
     * 
     * @param {String} param 
     * @returns {Boolean}
     */
    isString: function (param) {
        return typeof param == 'string';
    },
    /**
     * 强转成字符串，不成功返回null
     * 
     * @param {String} param 
     * @returns {String}
     */
    toString: function (param) {
        try {
            return JSON.stringify(param);
        } catch (e) {
            return null;
        }
    }
};

var TYPE = {
    Array: 'ARRAY',
    Boolean: 'BOOL',
    Function: 'FUNCTION',
    Number: 'NUMBER',
    Object: 'OBJECT',
    String: 'STRING'
};

declare namespace type {
    const TYPE = {
        ARRAY: 'Array',
        BOOLEAN: 'Boolean',
        FUNCTION: 'Function',
        NUMBER: 'Number',
        OBJECT: 'Object',
        STRING: 'String'
    },
    /**
     * 库：数组类型
     */
    const Array = array,
    /**
     * 库：布尔类型
     */
    const Boolean = bool,
    /**
     * 库：方法类型
     */
    const Function = fun,
    /**
     * 库：数字类型
     */
    const Number = number,
    /**
     * 库：对象类型
     */
    const Object = object,
    /**
     * 库：字符串类型
     */
    const String = string,

    /**
     * 方法：判断变量是否存在
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    const isExist = function isExist(param) {
        return typeof param !== 'undefined';
    },

    /**
     * 方法：判断变量是否不存在
     * 
     * @param {any} param 
     * @returns {Boolean}
     */
    const isNotExist = function isNotExist(param) {
        return typeof param === 'undefined';
    },

    /**
     * 方法：判断一个对象是否是一个方法的实例
     * 
     * @param {Object} child 
     * @param {funtion} parent 
     * @returns {Boolean}
     */
    const isChildOf = function isChildOf(child: any, parent: Function) {
        return object.isObject(child) && fun.isFunction(parent) && child instanceof parent;
    },

    /**
     * 方法：获得一个参数的类型
     * 
     * @param {any} param 
     * @returns {string}
     */
    const getType = function (param) {
        return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
    },

    /**
     * 方法：判断一个参数是不是指定的类型
     * 
     * @param {any} param 
     * @param {string} type 
     * @returns {Boolean}
     */
    const isType = function (param, type: string) {
        return this.getType(param) === type;
    }
}