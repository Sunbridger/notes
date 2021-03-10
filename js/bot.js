const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const fs = require('fs')
const request = require('request')

let bot
let msgs = {}; // 用来存所有消息的对象（此处和数组作用一样）
let tipReceiver = 'filehelper'; // 如何通知我
let meID = ''; // 用来记录“我”的名字

try {
    bot = new Wechat(require('./wxrecall.json'))
}
catch (e) {
    bot = new Wechat()
}

// 设置心跳间隔：
bot.setPollingIntervalGetter(function () {
    // return 8 * 60 * 60 * 1000; // 8 小时
    return 20*1000; // 测试用 20 秒
});

// 启动机器人
if (bot.PROP.uin) {
    // 存在登录数据时，可以随时调用restart进行重启
    bot.restart()
} else {
    bot.start()
}


// uuid事件，参数为uuid，根据uuid生成二维码
bot.on('uuid', uuid => {
    // 在终端（命令行）生成二维码：
    qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
        small: true
    })

    // 同时将登录二维码图片保存到本地：
    console.log('https://login.weixin.qq.com/qrcode/'+uuid+' 已保存到本地');
    request('https://login.weixin.qq.com/qrcode/' + uuid).pipe(fs.createWriteStream('./wxlogin.png'));
})

// 登录成功事件
bot.on('login', () => {
    console.log('登录成功');
    // 保存数据，将数据序列化之后保存到任意位置
    fs.writeFileSync('./wxrecall.json', JSON.stringify(bot.botData))
})

// 登出成功事件
bot.on('logout', () => {
    console.log('登出成功')
    // 清除数据
    // fs.unlinkSync('./sync-data.json')
})

// 错误事件，参数一般为Error对象
bot.on('error', err => {
    console.error('错误：', err)
})


bot.on('login', () => {
    bot.sendMsg('bot start: ' + new Date().toLocaleString(), tipReceiver)
        .catch(err => {
            bot.emit('error', err)
        })

    meID = bot.user.UserName;
})

// 如何处理会话消息
bot.on('message', msg => {
    // 消息类型：

    switch (msg.MsgType) {
        case bot.CONF.MSGTYPE_TEXT:
            // 文本消息
            msgs[msg.MsgId] = {
                type: msg.MsgType,
                from: bot.contacts[msg.FromUserName].getDisplayName(),
                time: msg.getDisplayTime(),
                originalTime: msg.CreateTime,
                fromId: msg.FromUserName,
                toId: msg.ToUserName,
                content: msg.Content,
                originalContent: msg.OriginalContent,
            };
            break
        case bot.CONF.MSGTYPE_IMAGE:
            // 图片消息

            msgs[msg.MsgId] = {
                type: msg.MsgType,
                from: bot.contacts[msg.FromUserName].getDisplayName(),
                time: msg.getDisplayTime(),
                originalTime: msg.CreateTime,
            };
            break
        case bot.CONF.MSGTYPE_VOICE:
            // 语音消息

            msgs[msg.MsgId] = {
                type: msg.MsgType,
                from: bot.contacts[msg.FromUserName].getDisplayName(),
                time: msg.getDisplayTime(),
                originalTime: msg.CreateTime,
            };
            break
        case bot.CONF.MSGTYPE_EMOTICON:
            // 表情消息

            msgs[msg.MsgId] = {
                type: msg.MsgType,
                from: bot.contacts[msg.FromUserName].getDisplayName(),
                time: msg.getDisplayTime(),
                originalTime: msg.CreateTime,
            };
            break
        case bot.CONF.MSGTYPE_VIDEO:
        case bot.CONF.MSGTYPE_MICROVIDEO:
            // 视频消息

            msgs[msg.MsgId] = {
                type: msg.MsgType,
                from: bot.contacts[msg.FromUserName].getDisplayName(),
                time: msg.getDisplayTime(),
                originalTime: msg.CreateTime,
            };
            break
        case bot.CONF.MSGTYPE_APP:
            if (msg.AppMsgType == 6) {
                // 文件消息
                let fileName = msg.FileName;
                fileName = fileName.replace(/ /g, "");
                fileName = fileName.replace(/:/g, "-");
                bot.getDoc(msg.FromUserName, msg.MediaId, msg.FileName).then(res => {
                    fs.writeFileSync(`./wechat files/${fileName}`, res.data)
                }).catch(err => {
                    bot.emit('error', err)
                })

                msgs[msg.MsgId] = {
                    type: msg.MsgType,
                    from: bot.contacts[msg.FromUserName].getDisplayName(),
                    time: msg.getDisplayTime(),
                    originalTime: msg.CreateTime,
                    postfix: fileName.lastIndexOf('.')==-1?".unknown":fileName.slice(fileName.lastIndexOf('.')),
                    AppMsgType: msg.AppMsgType,
                    FromUserName: msg.FromUserName,
                    MediaId: msg.MediaId,
                    FileName: msg.FileName
                };
            }
            else{
                msgs[msg.MsgId] = {
                    type: bot.CONF.MSGTYPE_TEXT, // 以文本处理应用分享链接
                    from: bot.contacts[msg.FromUserName].getDisplayName(),
                    time: msg.getDisplayTime(),
                    originalTime: msg.CreateTime,
                    fromId: msg.FromUserName,
                    toId: msg.ToUserName,
                    content: msg.Url || "分享链接获取失败",
                    originalContent: msg.OriginalContent,
                };
            }
            break
        default:
            break
    }
})
