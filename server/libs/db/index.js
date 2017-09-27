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
        db[file] = require('./cmds/' + file);
    }
}

module.exports = db;