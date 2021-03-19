/*
 * @Author: 七彩
 * @Date: 2021-03-17 20:20:51
 * @LastEditTime: 2021-03-19 21:09:33
 * @Description: 演示deno的导入
 */

// 1. 本地导入
import { add, multiply } from 'utils.js';

function totalCost(outbound, inbound, tax) {
  return multiply(add(outbound, inbound), tax);
}

console.log(totalCost(1, 2, 3));
console.log(totalCost(4, 5, 6));

// 2. 远端导入
import { serve } from 'https://Deno.land/std/http/server.ts';
 
const server = serve({ port: 8000 });
 console.log(8000);
for await (const req of server) {
  req.respond({ body: 'Hello Deno' });
}