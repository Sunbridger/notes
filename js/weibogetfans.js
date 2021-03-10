const axios = require('axios');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '119.45.209.166',
  user     : 'root',
  port     : '3333',
  password : '123456',
  database : 'weibo'
});

// connection.connect();

// connection.query('SELECT * from user', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0]);
// });
// connection.end();
axios.get('https://www.weibo.com/ajax/friendships/friends?relate=fans&page=1&uid=1713926427&type=all').then((res) => {
    console.log(res.data);
});
/**
avatar_large：头像
geo_enabled ：可信任的？
city： 城市
credit_score：信用分数？
description：简介
followers_count：粉丝数量
friends_count：关注数量
gender：性别
id：
mbrank：会员等级
name：姓名
online_status：是否在线
*/
