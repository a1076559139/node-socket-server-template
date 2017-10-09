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
global.awaitDoErr = function (target, funcName, ...arg) {
    return new Promise(function (resolve, reject) {
        let filename = logSuccess(arg, 'call', 2, funcName);
        target[funcName](...arg, function (err, ...parma) {
            if (err) {
                logError(err, 'rest', filename, funcName);
                reject({
                    code: 400,
                    message: err
                });
            } else {
                let result = parma.length <= 1 ? parma[0] : parma;
                logSuccess(result, 'rest', filename, funcName);
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
global.awaitDo = function (target, funcName, ...arg) {
    return new Promise(function (resolve) {
        let filename = logSuccess(arg, 'call', 2, funcName);
        target[funcName](...arg, function (...parma) {
            let result = parma.length <= 1 ? parma[0] : parma;
            logSuccess(result, 'rest', filename, funcName);
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

const log = console.log;
const error = console.error;

global.logError = console.error = function (msg, extra, level, funName) {
    msg = msg === undefined ? [] : msg;

    let pathname = '';
    if (typeof level === 'string') {
        pathname = level;
    } else {
        if (typeof level !== 'number' || level < 1) {
            level = 1;
        }
        let i = /\(.*:\d+:\d+/g;
        let e = new Error();
        pathname = e.stack.match(i)[level].slice(1);
    }

    extra = extra || 'logs';
    // error.call(console, '[ERROR]  [' + extra + ']  [' + pathname + ':' + (funName || 'error') + ']  ' + JSON.stringify(msg));
    log.call(console, '[ERROR]  [' + extra + ']  [' + pathname + ':' + (funName || 'error') + ']  ' + JSON.stringify(msg));

    return pathname;
};

global.logSuccess = console.log = function (msg, extra, level, funName) {
    msg = msg === undefined ? [] : msg;

    let pathname = '';
    if (typeof level === 'string') {
        pathname = level;
    } else {
        if (typeof level !== 'number' || level < 1) {
            level = 1;
        }
        let i = /\(.*:\d+:\d+/g;
        let e = new Error();
        pathname = e.stack.match(i)[level].slice(1);
    }

    extra = extra || 'logs';
    log.call(console, '[OK]  [' + extra + ']  [' + pathname + ':' + (funName || 'log') + ']  ' + JSON.stringify(msg));

    return pathname;
};

global.config = require('./config');
global.type = require('./util/type');
global.util = require('./util/util');
global.intersection = require('./util/intersection');

global.io = require('./server');
logSuccess('server start');

process.on('uncaughtException', function (err) {
    logError('uncaughtException', err.stack);
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