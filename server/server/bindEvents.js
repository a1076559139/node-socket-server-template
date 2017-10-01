const fs = require('fs');
const cmds = {};

function readdirSync(path) {
    let fs_cmds = fs.readdirSync(path);
    for (let i = 0; i < fs_cmds.length; i++) {
        let file = fs_cmds[i];
        let validPath = path + '/' + file;
        if (file.endsWith('.js')) {
            try {
                let fn = require('./../' + validPath);
                if (typeof fn === 'function') {
                    cmds[validPath.slice(7, validPath.length - 3).replace(/\//g, '.')] = fn;
                } else {
                    throw Error('./../' + validPath + ' is not function');
                }
            } catch (e) {
                logError(e.message + ' in ./../' + validPath, 'engine', __filename, 'readdirSync');
            }
        } else {
            readdirSync(validPath);
        }
    }
}
readdirSync('events');

module.exports = function (client) {
    client.UserEvents = {};
    for (let k in cmds) {
        if (!client.UserEvents[k]) {
            client.UserEvents[k] = new cmds[k](client);
            let filename = __dirname.slice(0, __dirname.length - 6) + 'events\\' + k.replace(/\./g, '\\') + '.js';
            client.on(k, async function (...args) {

                if (typeof args[args.length - 1] === 'function') {
                    let fn = args.splice(args.length - 1)[0];
                    args.push(function (...args) {
                        try {
                            fn(...args);
                            logSuccess(args, 'response', filename, 'response');
                        } catch (e) {
                            logError(e.message || e, 'response', filename, 'response');
                            return Promise.reject(e.message || e);
                        }
                    });
                }

                let main = this.UserEvents[k];
                if (main.before) {
                    logSuccess(args, 'call', filename, 'before');
                    try {
                        let r = await main.before(...args);
                        logSuccess(r, 'result', filename, 'before');
                        if (r === false) {
                            return;
                        }
                    } catch (e) {
                        logError(e.message || e, 'result', filename, 'before');
                        return Promise.reject(e.message || e);
                    }
                }
                if (main.do) {
                    logSuccess(args, 'call', filename, 'do');
                    try {
                        let r = await main.do(...args);
                        logSuccess(r, 'result', filename, 'do');
                    } catch (e) {
                        logError(e.message || e, 'result', filename, 'do');
                        return Promise.reject(e.message || e);
                    }
                }

                if (main.after) {
                    logSuccess(args, 'call', filename, 'after');
                    try {
                        let r = await main.after(...args);
                        logSuccess(r, 'result', filename, 'after');
                    } catch (e) {
                        logError(e.message || e, 'result', filename, 'do');
                        return Promise.reject(e.message || e);
                    }
                }
            });
        }
    }
};