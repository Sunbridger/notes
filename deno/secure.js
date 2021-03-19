/*
 * @Author: 七彩
 * @Date: 2021-03-17 20:15:50
 * @LastEditTime: 2021-03-18 20:15:17
 * @Description: 演示安全特性
 */


// Deno 在默认情况下是安全的。我们必须允许自己能够访问 Deno 领域以外的所有内容，可能是网络访问或文件访问，否则 Deno 将会拒绝工作。
// deno run --allow-net secure.js  

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';
 
fetch(url)
  .then((result) => result.json())
  .then((result) => console.log(result.hits));
  