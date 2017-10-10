# 使用

# SERVER中
`events下面是所有事件，用户自定义事件建议放到cmds下面，比如：`
```
目录：events/cmds/zhufu/fa.js
客户端调用：socket.emit('cmds.zhufu.fa',...)
```
___
`fa.js中定义了befor、do、after方法，会依次调用(不存在则不调用)。如果befor返回false了，do和after将不会调用`
___
`目录：libs/db/cmds下可以添加n多*.js，在events下面的所有js中都可以通过全局变量直接调用，比如：`
```
let data = await libs.db.zhuFu.getZhuFu();
```
___
`events下方法被调用或者libs/db下方法被调用，都会打印log，包括[call]、[return](日志中包括方法所在文件及行列号以及参数/返回值)、[error]日志。如无特殊需求，用户代码区不需要try，直接throw程序就可以捕获并输出错误日志`
```
qu.prototype.do = async function (fn) {
    fn(await libs.db.zhuFu.getZhuFu());
};
这种情况下，fn执行的时候还会打印一条[resp]日志
```

# CLIENT中
```
目录：events/cmds/zhufu/fa.js
客户端调用：socket.emit('cmds.zhufu.fa',...)
```