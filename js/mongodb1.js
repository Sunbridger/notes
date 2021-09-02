const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://root:123456@119.45.209.166:27017/testdb`; // 账号登陆

MongoClient.connect(url, { useUnifiedTopology: true }).then((res) => {
  console.log(res);
}).catch((e) => console.log(e));
