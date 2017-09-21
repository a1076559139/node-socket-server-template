const fs = require('fs');
const cmds = {};

function readdirSync(path) {
    let fs_cmds = fs.readdirSync(path);
    for (let i = 0; i < fs_cmds.length; i++) {
        let file = fs_cmds[i];
        let validPath = path + '/' + file;
        if (file.endsWith('.js')) {
            if (file !== 'open.js') {
                let fn = require('./../' + validPath);
                if (typeof fn === 'function') {
                    cmds[validPath.slice(7, validPath.length - 3).replace(/\//g,'.')] = require('./../' + validPath);
                } else {
                    throw './../' + validPath + ' is not function';
                }
            }
        } else {
            readdirSync(validPath);
        }
    }
}
readdirSync('events');

module.exports = function (client) {
    for (let k in cmds) {
        if (!client.UserEvents[k]) {
            client.UserEvents[k] = new cmds[k](client);
            client.on(k, async function (...args) {
                let main = this.UserEvents[k];
                main.before && await main.before(...args);
                main.do && await main.do(...args);
                main.after && await main.after(...args);
            });
        }
    }
};