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
                logError(__filename, 'readdirSync', e.message + ' in ./../' + validPath);
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
                            logSuccess(filename, 'response', args, 'response');
                        } catch (e) {
                            logError(filename, 'response', e.message || e, 'response');
                            return Promise.reject(e.message || e);
                        }
                    });
                }

                let main = this.UserEvents[k];
                if (main.before) {
                    logSuccess(filename, 'before', args, 'call');
                    try {
                        let r = await main.before(...args);
                        logSuccess(filename, 'before', r, 'result');
                        if (r === false) {
                            return;
                        }
                    } catch (e) {
                        logError(filename, 'before', e.message || e, 'result');
                        return Promise.reject(e.message || e);
                    }
                }
                if (main.do) {
                    logSuccess(filename, 'do', args, 'call');
                    try {
                        let r = await main.do(...args);
                        logSuccess(filename, 'do', r, 'result');
                    } catch (e) {
                        logError(filename, 'do', e.message || e, 'result');
                        return Promise.reject(e.message || e);
                    }
                }

                if (main.after) {
                    logSuccess(filename, 'after', args, 'call');
                    try {
                        let r = await main.after(...args);
                        logSuccess(filename, 'after', r, 'result');
                    } catch (e) {
                        logError(filename, 'do', e.message || e, 'result');
                        return Promise.reject(e.message || e);
                    }
                }
            });
        }
    }
};