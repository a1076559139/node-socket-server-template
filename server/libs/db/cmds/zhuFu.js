const Redis = require('./../libs/redis');
const redis = Redis.getClient();

const db = {};

const redis_key = 'zhufu';

const texts = [
    { text: '没有你，生活没了味道，没有你，思念没了依靠，没有你，幸福没了着落，没有你，节日没了快乐，没有你，中秋我该怎么过，愿可爱月饼，伴你中秋快乐。', name: '匿名' },
    { text: '明月千里难以触摸，对你的思念无处寄托。举杯邀明月，说：福多！财多！快乐多！', name: '匿名' },
    { text: '秋风清，秋月明，祝你天天好心情；桂花香，皓月亮，愿你事事都顺畅；笙歌响，糕饼香，送你如意加吉祥；中秋节祝你合家欢乐、幸福如意。', name: '匿名' },
    { text: '这轮弯弯的眉月，可是你的嘴唇？为什么不见那瓣，是在亲吻你梦中的恋人，还是在奏着玉箫？祝中秋快乐！', name: '匿名' },
    { text: '我和太阳打了一架，为的是想把月亮抢过来送给你，没想到那家伙太不给面子，我一不小心就把它给踩成月饼了，你要不介意就一并收下吧！并祝你中秋快乐！', name: '匿名' },
    { text: '龙腾虎跃在神州！欢度国庆，共度中秋！在这美好日子里，让我用最真挚的祝福伴您度过，祝您：吃啥啥都香，想啥啥都成！酷过周杰伦，富过李嘉诚！', name: '匿名' },
    { text: '人有悲欢离合，月有阴晴圆缺，只是不能团圆，但愿人长久，千里共婵娟。中秋节快乐！', name: '匿名' },
    { text: '三五夜中新月色，二千里外故人心。今夜月明人尽望，不知秋思落谁家。', name: '匿名' },
    { text: '送一缕秋风陪你月圆，送一个微笑让你心宽，送一个月饼使你心甜，送一个祝福让你意满，亲爱的客户，感谢您长期以来的支持和厚爱，祝福您合家欢乐，中秋幸福团圆！', name: '匿名' },
    { text: '月儿圆圆挂天边，荷叶圆圆水中间。梦想圆圆都实现，成功圆圆舞翩跹。快乐圆圆永不变，祝福圆圆情无限：中秋花好月又圆，幸福与你两团圆。', name: '匿名' },
    { text: '烦恼随风，刮向天空，快乐成风，迎面吹送。道顺，人顺，事事顺，你好，我好，大家好。中秋快乐。', name: '匿名' },
    { text: '中秋祝福：皓月闪烁，星光闪耀，中秋佳节，美满时刻！', name: '匿名' }
];

db.putZhuFu = async function (data) {
    if (!type.String.isString(data)) {
        return Promise.reject('参数错误');
    }
    await awaitDoErr(__filename, redis, 'rpush', redis_key, data);
}

db.getZhuFu = async function () {
    let length = await awaitDoErr(__filename, redis, 'llen', redis_key);
    if (length > 10) {
        let index = type.Number.random(0, length - 1);
        let string = await awaitDoErr(__filename, redis, 'lindex', redis_key, index);
        return JSON.parse(string);
    } else {
        let index = type.Number.random(0, texts.length - 1 + length);
        if (index < texts.length) {
            return texts[index];
        } else {
            let string = await awaitDoErr(__filename, redis, 'lindex', redis_key, index - texts.length);
            return JSON.parse(string);
        }
    }
}

module.exports = db;