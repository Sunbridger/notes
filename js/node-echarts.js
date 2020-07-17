var express = require('express');

var path = require('path');

var body_parser = require("body-parser");

var indexRouter = require('./routes-index');

var app = express();



//设置请求头格式
app.use(body_parser.urlencoded({extended: false}));

app.use(body_parser.json());

//挂载静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use('/image', indexRouter);
