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
            client.on(k, async function (...args) {
                try {
                    // let filename = __dirname.slice(0, __dirname.length - 6) + 'events\\' + k.replace(/\./g, '\\') + '.js';
                    let main = this.UserEvents[k];
                    if (!main.before || await awaitDoErr(__filename, main, 'before', ...args) !== false) {
                        // main.do && await main.do(...args);
                        // main.after && await main.after(...args);
                        await awaitDoErr(__filename, main, 'do', ...args);
                        await awaitDoErr(__filename, main, 'after', ...args);
                    }
                } catch (e) { }
            });
        }
    }
};