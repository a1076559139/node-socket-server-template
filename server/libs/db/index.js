const fs = require('fs');

const db = {};

const files_cmds = fs.readdirSync('./libs/db/cmds');
for (let i = 0; i < files_cmds.length; i++) {
    let file = files_cmds[i];
    if (file.endsWith('.js')) {
        file = file.slice(0, file.length - 3);
        if (db[file]) {
            throw file + ' is already exists';
        }
        let o = require('./cmds/' + file);
        if (typeof o === 'function') {
            let filename = __dirname + '\\cmds\\' + file + '.js';
            db[file] = async function (...args) {
                logSuccess(filename, file, args, 'call');
                try {
                    let r = await o(args);
                    logSuccess(filename, file, r, 'result');
                    return r;
                } catch (e) {
                    logError(filename, k, e, 'result');
                    return Promise.reject(e);
                }
            };
        } else {
            db[file] = {};
            let filename = __dirname + '\\cmds\\' + file + '.js';
            for (let k in o) {
                db[file][k] = async function (...args) {
                    logSuccess(filename, k, args, 'call');
                    try {
                        let r = await o[k](args);
                        logSuccess(filename, k, r, 'result');
                        return r;
                    } catch (e) {
                        logError(filename, k, e, 'result');
                        return Promise.reject(e);
                    }
                };
            }
        }
    }
}

module.exports = db;