var QcloudSms = require("qcloudsms_js");
// 短信应用 SDK AppID
var appid = 1400247033;  // SDK AppID 以1400开头
// 短信应用 SDK AppKey
var appkey = "7dbbdc0a1859b42fac4bb65de75fbfc1";
// 需要发送短信的手机号码
var phoneNumbers = ["21212313123", "12345678902", "12345678903"];
// 短信模板 ID，需要在短信控制台中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
// 签名
var smsSign = "腾讯云";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
// 实例化 QcloudSms
var qcloudsms = QcloudSms(appid, appkey);
// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
      console.log("err: ", err);
  } else {
      console.log("request data: ", res.req);
      console.log("response data: ", resData);
  }
}
