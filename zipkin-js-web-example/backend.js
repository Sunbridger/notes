const express = require('express');
const app = express();


app.get('/api', (req, res) => {
  sleep(1500);
  res.send(new Date().toString());
});

app.listen(9000, () => {
  console.log('Backend listening on port 9000!');
});