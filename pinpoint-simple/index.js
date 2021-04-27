require('pinpoint-node-agent')
var express = require('express');

var app = express();

app.get('/users', (req, res) => {
  res.send('respond with a resource');
});

app.listen(9980, () => {
  console.log(9980);
})