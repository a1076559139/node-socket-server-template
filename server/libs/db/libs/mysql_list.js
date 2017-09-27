// const Redis = require('./redis'),
//     redis = Redis.getClient();
// const type = require('type-util');
// const crc32 = require('crc-32');
// const redis_key = 'mysql:cmd:queue';

// const mysql_list = {};

// const all = config.mysql_config.database * config.mysql_config.table;

// /**
//  * 向mysql队列中添加sql语句
//  * 
//  * @param {String} database
//  * @param {Object} query
//  */
// mysql_list.put = async function put(dbname, query) {
//     if (!type.String.isString(dbname) || !type.Object.isObject(query)) {
//         console.error(`${__filename} ${arguments.callee.name} ${JSON.stringify(arguments)} error query`);
//         return Promise.reject('参数错误');
//     }

//     if (typeof query.uid !== 'undefined') {
//         if (type.Number.isNumber(query.uid)) {
//             query.uid = type.Number.toInt(query.uid, 0);
//         } else if (type.String.isString(query.uid)) {
//             query.uid = Math.abs(crc32.str(query.uid));
//         } else {
//             return Promise.reject('mysql query.uid err ' + query.uid);
//         }
//         let num = query.uid % all;
//         let database = Math.floor(num / config.mysql_config.database);
//         let table = num % config.mysql_config.table;

//         query.sql = query.sql.replace(/yy/g, database);
//         query.sql = query.sql.replace(/xx/g, table);
//     }
//     delete query.uid;

//     let o = {
//         database: dbname,
//         query: query,
//         time: Date.now()
//     };
//     return await awaitDoErr(redis, redis.rpush, redis_key, JSON.stringify(o));
// };

// module.exports.getClient = function () {
//     return mysql_list;
// };