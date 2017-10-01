// module.exports = function (client) {
//     client._schedules = {};
//     client._schedulesId = 1;
//     client.scheduleOnce = function (callback, delay) {
//         if (!this.connected) {
//             return;
//         }
//         delay = isNaN(delay) ? 0 : delay;

//         this.schedule(callback, 0, 0, delay);
//     };
//     client.schedule = function (callback, interval, repeat, delay) {
//         if (!this.connected) {
//             return;
//         }
//         interval = isNaN(interval) ? 0 : interval;
//         repeat = isNaN(repeat) ? -1 : repeat;
//         delay = isNaN(delay) ? 0 : delay;

//         let id = this._schedulesId;

//         callback._scheduleId = id;

//         this._schedules[id] = {};
//         this._schedules[id].c = callback;
//         this._schedules[id].i = interval;
//         this._schedules[id].r = repeat;
//         this._schedules[id].d = delay;
//         this._schedules[id].n = Date.now();

//         this._schedules[id].t = setInterval(function (id) {
//             // 不可用
//             if (!this.connected) {
//                 this.unschedule(id);
//                 return;
//             }

//             // 调用
//             this._schedules[id].c.call(this, Date.now() - this._schedules[id].n);

//             // 不循环
//             if (this._schedules[id].r === 0) {
//                 this.unschedule(id);
//                 return;
//             }

//             // 停止当前定时器
//             clearInterval(this._schedules[id].t);

//             // 刷新时间戳
//             this._schedules[id].n = Date.now();

//             // 新定时器
//             this._schedules[id].t = setInterval(function (id) {
//                 // 不可用
//                 if (!this.connected) {
//                     this.unschedule(id);
//                     return;
//                 }
//                 // 调用
//                 this._schedules[id].c.call(this, Date.now() - this._schedules[id].n);

//                 // 剩余循环次数为0
//                 if (this._schedules[id].r > 0 && --this._schedules[id].r === 0) {
//                     this.unschedule(id);
//                     return;
//                 }

//                 // 刷新时间戳
//                 this._schedules[id].n = Date.now();
//             }.bind(this, id), interval);
//         }.bind(this, id), delay);

//         this._schedulesId = this._schedulesId >= 10E7 ? 1 : this._schedulesId + 1;
//         return id;
//     };
//     client.unschedule = function (parma) {
//         if (!parma) {
//             console.error('error');
//             return;
//         }
//         let id = parma._scheduleId || parma;
//         clearInterval(this._schedules[id].t);
//         delete this._schedules[id];
//     };
//     client.unscheduleAllCallbacks = function () {
//         for (let id in this._schedules) {
//             this.unschedule(id);
//         }
//     };
//     client.on('disconnect', function () {
//         this.unscheduleAllCallbacks();
//     });
// };



module.exports = function (client) {
    client._schedules = {};
    client._schedulesId = 1;
    client.scheduleOnce = function (callback, delay) {
        if (!this.connected) {
            return;
        }
        delay = isNaN(delay) ? 0 : delay;

        if (!callback._scheduleId) {
            callback._scheduleId = this._schedulesId;
            this._schedulesId = this._schedulesId >= 10E7 ? 1 : this._schedulesId + 1;
        }
        let id = callback._scheduleId;

        this._schedules[id] = setTimeout(function (id, time, delay) {
            delete callback._scheduleId;
            callback.call(this, Date.now() - time, delay);
        }.bind(this, id, Date.now(), delay), delay);
        return id;
    };
    client.schedule = function (callback, interval, repeat, delay) {
        if (!this.connected) {
            return;
        }
        interval = isNaN(interval) ? 0 : interval;
        repeat = isNaN(repeat) ? -1 : repeat;
        delay = isNaN(delay) ? 0 : delay;

        callback._scheduleId = this.scheduleOnce(function fn(dt, delay) {
            fn._scheduleId = callback._scheduleId;
            if (repeat < 0 || repeat > 0) {
                repeat > 0 && --repeat;
                this.scheduleOnce(fn, interval - dt + delay);
            }
            callback.call(this, dt, delay);
        }, delay);

        return callback._scheduleId;
    };
    client.unschedule = function (parma) {
        if (!parma) {
            console.error('error');
            return;
        }
        let id = parma._scheduleId || parma;
        if (id) {
            this._schedules[id].close();
            delete this._schedules[id];
        }
    };
    client.unscheduleAllCallbacks = function () {
        for (let id in this._schedules) {
            this.unschedule(id);
        }
    };
    client.on && client.on('disconnect', function () {
        this.unscheduleAllCallbacks();
    });
    return client;
};