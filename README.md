# 使用

# SERVER中
events下面是所有事件，用户自定义事件建议放到cmds下面，比如：
```
目录：events/cmds/zhufu/fa.js
客户端调用：socket.emit('cmds.zhufu.fa',...)
```
___
fa.js中定义了befor、do、after方法，会依次调用(不存在则不调用)。如果befor返回false了，do和after将不会调用
___
目录：libs/db/cmds下可以添加n多*.js，在events下面的所有js中都可以通过全局变量直接调用，比如：
```
let data = await libs.db.zhuFu.getZhuFu();
```
___
events下方法被调用或者libs/db下方法被调用，都会打印log，包括[call]、[return](日志中包括方法所在文件及行列号以及参数/返回值)、[error]日志。如无特殊需求，用户代码区不需要try，直接throw程序就可以捕获并输出错误日志
```
qu.prototype.do = async function (fn) {
    fn(await libs.db.zhuFu.getZhuFu());
};
这种情况下，fn执行的时候还会打印一条[resp]日志
```
```
[OK]  [logs]  [f:\a1076559139\node-socket-server-template\server\index.js:125:1:log]  "server start"
[ERROR]  [logs]  [f:\a1076559139\node-socket-server-template\server\libs\db\libs\redis.js:19:13:error]  "redis content err Error: Redis connection to 127.0.0.1:9999 failed - connect ECONNREFUSED 127.0.0.1:9999"
[OK]  [logs]  [f:\a1076559139\node-socket-server-template\server\libs\db\libs\redis.js:16:13:log]  "redis content success"
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:before]  []
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:before]  ""
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:do]  []
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:do]  ""
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:after]  []
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\events\connect.js:1:1:after]  ""
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\events\cmds\zhufu\qu.js:1:1:do]  [null]
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\events\cmds\zhufu\qu.js:12:28:getZhuFu]  []
[OK]  [call]  [f:\a1076559139\node-socket-server-template\server\libs\db\cmds\zhuFu.js:31:24:llen]  ["zhufu"]
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\libs\db\cmds\zhuFu.js:31:24:llen]  0
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\events\cmds\zhufu\qu.js:12:28:getZhuFu]  {"text":"中秋祝福：皓月闪烁，星光闪耀，中秋佳节，美满时刻！","name":"匿名"}
[OK]  [resp]  [f:\a1076559139\node-socket-server-template\server\events\cmds\zhufu\qu.js:12:5:resp]  [{"text":"中秋祝福：皓月闪烁，星光闪耀，中秋佳节，美满时刻！","name":"匿名"}]
[OK]  [rest]  [f:\a1076559139\node-socket-server-template\server\events\cmds\zhufu\qu.js:1:1:do]  ""
```
# CLIENT中
```
目录：events/cmds/zhufu/fa.js
客户端调用：socket.emit('cmds.zhufu.fa',...)
```