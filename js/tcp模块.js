let net=require('net');
let ser =net.createServer();
ser.on('connection',(socket)=>{
  socket.on('data',(d)=>{
    console.log(d,'你好')
  })
  socket.on('end',()=>{
    console.log('断开了');
  })
})
ser.listen(9630,()=>{
  console.log('开启9630监听')
})