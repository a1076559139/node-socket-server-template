// const _Mysql = require('mysql');
// const crc32 = require('crc-32');
// const type = require('type-util');
// // const host = '';
// // const user = '';
// // const password = '';

// const all = config.mysql_config.database * config.mysql_config.table;

// const Mysql = function (param) {
//     this.host = param.host;
//     this.port = param.port;
//     this.user = param.user;
//     this.password = param.password;
//     this.connectionLimit = param.connectionLimit || 100;
// };

// Mysql.createClient = function (params) {
//     return new Mysql(params);
// };

// Mysql.prototype.getPool = function () {
//     if (!this.pool) {
//         this.pool = _Mysql.createPool({
//             connectionLimit: this.connectionLimit,
//             host: this.host,
//             port: this.port,
//             user: this.user,
//             password: this.password,
//             database: 'db_wx_group_info'
//         });
//         this.pool.on('connection', function () {
//             console.log('mysql content success');
//         });
//         this.pool.on('error', function (err) {
//             console.log('mysql content err %j', err);
//             this.pool = null;
//         }.bind(this));
//     }
//     return this.pool;
// };
// /**
//  * this.pool.query(
//         {
//             sql: 'select * from t_user where t_user.username=? and t_user.password=?',
//             values: ['aaaaaa', '123123']
//         },
//         function (err, rows, keys) {
//             for (let row of rows) {
//                 let result = '';
//                 for (let key of keys) {
//                     result += ('' + row[key.name]);
//                 }
//                 console.log(result);
//             }
//         }
//     );
//  */
// Mysql.prototype.query = function (query, callback) {
//     if (typeof query.uid !== 'undefined') {
//         if (type.Number.isNumber(query.uid)) {
//             query.uid = type.Number.toInt(query.uid, 0);
//         } else if (type.String.isString(query.uid)) {
//             query.uid = Math.abs(crc32.str(query.uid));
//         } else {
//             return Promise.reject('mysql query.uid err ' + query.uid);
//         }
//         if (this._uid !== query.uid) {
//             this._uid = query.uid;
//             let num = query.uid % all;
//             this.database = Math.floor(num / config.mysql_config.database);
//             this.table = num % config.mysql_config.table;
//         }
//         query.sql = query.sql.replace(/yy/g, this.database);
//         query.sql = query.sql.replace(/xx/g, this.table);
//     }

//     this.getPool().query(
//         query,
//         callback
//     );
// };

// Mysql.prototype.setDbandTable = function (uid) {
//     let num = uid % 256;
//     this.database = Math.floor(num / 16);
//     this.table = num % 16;
// };

// const mysql = Mysql.createClient(config.neiwang ? config.mysql.neiwang : config.mysql.waiwang);

// module.exports.getClient = function () {
//     return mysql;
// };