// 演示特性一：
// Deno 在默认情况下是安全的。我们必须允许自己能够访问 Deno 领域以外的所有内容，可能是网络访问或文件访问，否则 Deno 将会拒绝工作。
// deno run --allow-net secure.js  

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';
 
fetch(url)
  .then((result) => result.json())
  .then((result) => console.log(result.hits));
  