// deno的导入

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