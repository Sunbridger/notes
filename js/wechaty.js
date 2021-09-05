import { Wechaty } from 'wechaty'

const bot = new Wechaty({
  // 微信机器人使用了 iPad 协议登录，puppet 为 `PuppetPadplus`
  puppet: new PuppetPadplus(),
  name: 'daxiange'
})

bot
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
  .on('message',       message => console.log(`Message: ${message}`))
  .start()