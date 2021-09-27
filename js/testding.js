const Bot = require('ding-bot-sdk');

// https://oapi.dingtalk.com/robot/send?access_token=8a347c38162df013478b7971586c760afcd0ca43e949b13afefe0c057c99103d

let access_token = '03dd8c0f4451660cb959650b99318c770726cb3c49a6c3c98ccd40e9e3bba242';

let secret = '';

// https://oapi.dingtalk.com/robot/send?access_token=03dd8c0f4451660cb959650b99318c770726cb3c49a6c3c98ccd40e9e3bba242
const bot = new Bot({
    access_token,
    secret,
});

bot.send({
    "msgtype": "text",
    "text": {
        "content": "文本测次  是不一样的烟火"
    },
    "at": {
        // "isAtAll": true
    }
})



