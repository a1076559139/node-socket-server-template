const fs = require('fs');

/**
 * 将普通方法转成ES7方法
 *
 * @param {string} filename
 * @param {object} target
 * @param {string} func
 * @param {any} arg
 * @returns
 */
global.awaitDoErr = function (filename, target, funcName, ...arg) {
    return new Promise(function (resolve, reject) {
        logSuccess(filename, funcName, arg, 'call');
        target[funcName](...arg, function (err, ...parma) {
            if (err) {
                logError(filename, funcName, err, 'result');
                reject({
                    code: 400,
                    message: err
                });
            } else {
                let result = parma.length <= 1 ? parma[0] : parma;
                logSuccess(filename, funcName, result, 'result');
                resolve(result);
            }
        });
    });
};

/**
 * 将普通方法转成ES7方法
 *
 * @param {string} filename
 * @param {object} target
 * @param {string} func
 * @param {any} arg
 * @returns
 */
global.awaitDo = function (filename, target, funcName, ...arg) {
    return new Promise(function (resolve) {
        logSuccess(filename, funcName, arg, 'call');
        target[funcName](...arg, function (...parma) {
            let result = parma.length <= 1 ? parma[0] : parma;
            logSuccess(filename, funcName, result, 'result');
            resolve(result);
        });
    });
};

global.sleep = function (time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};

global.logError = function (filename, funName, msg, extra) {
    msg = msg === undefined ? [] : msg;
    extra = extra || 'log';
    let txt = '[ERROR]  [' + extra + ']';
    console.error(txt + '  [' + filename + ']  [' + funName + ']  ' + JSON.stringify(msg));
    console.log(txt + '  [' + filename + ']  [' + funName + ']  ' + JSON.stringify(msg));
};

global.logSuccess = function (filename, funName, msg, extra) {
    msg = msg === undefined ? [] : msg;
    extra = extra || 'log';
    let txt = '[OK]  [' + extra + ']';
    console.log(txt + '  [' + filename + ']  [' + funName + ']  ' + JSON.stringify(msg));
};

global.config = require('./config');
global.type = require('./util/type');
global.util = require('./util/util');
global.intersection = require('./util/intersection');

global.io = require('./server');
console.log('server start');

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err.stack);
});

//libs库设为全局
global.libs = {};
const files_libs = fs.readdirSync('./libs');
for (let i = 0; i < files_libs.length; i++) {
    let file = files_libs[i];
    if (libs[file]) {
        throw file + 'is already exists';
    }
    libs[file] = require('./libs/' + file);
}