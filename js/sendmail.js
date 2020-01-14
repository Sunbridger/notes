const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'QQ',
  port: 465,
  secureConnection: true,
  auth: {
    user: '739272884@qq.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'jnbofdxrorzcbdid',
  }
});

let mailOptions = {
  from: '"Sunbridger" <739272884@qq.com>', // sender address
  to: 'sunbridger@sina.com', // list of receivers
  subject: '来自于定时任务的警告⚠️',
  html: `
    <center>现在赶紧去看看吧！</center>
    <p>这是一段测试言语言语言语言语言语言语言语言语言语言语言语言语言语言语言语</p>
  `
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log(info.messageId, '-iiiid');
});
