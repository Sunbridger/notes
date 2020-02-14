const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: '163',
  port: 465,
  secureConnection: true,
  auth: {
    user: 'shuhaozhushou@163.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'QAWqaw123',
  }
});

let mailOptions = {
  from: '"哈哈哈哈哈" <shuhaozhushou@163.com>', // sender address
  to: 'sunbridger@sina.com', // list of receivers
  subject: '来自于定时任务的警告⚠️',
  html: `
    <center>现在赶紧去看看吧！</center>
    <p>这是一段测试言语言语言语言语言语言语言语言语言语言语言语言语言语言语言语</p>
  `
};

// send mail with defined transport obct
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error, 'error');
  } else {
      console.log(info.messageId, '-iiiid');
  }
});
