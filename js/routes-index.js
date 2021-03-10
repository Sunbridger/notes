//模块引入
const express = require('express');
const router = express.Router();

//生成echart图片模块
const node_echarts = require('node-echarts');
const path = require("path");
const fs = require("fs");

const ECHARTS_BAR = require("./echartsBar.js");

//返回结果集
var resultData = {
    status: "",
    data: {},
    msg: ""
};

//post请求柱状图
router.post('/bar', function (req, res, next) {
    var data = req.body;
    var {title, legendData, xData, seriesData} = data;
    if (title && seriesData.length !== 0 && legendData.length !== 0 && xData.length !== 0) {
        var option = ECHARTS_BAR(data);
        //生成饼图
        node_echarts({
            width: 500,
            height: 500,
            option: option,
            //创建图片地址
            path: path.join(__dirname, `../public/images/image.png`),
            enableAutoDispose: true
        });
        //读取图片并转化二进制流
        let bitmap = fs.readFileSync(path.join(__dirname, '../public/images/image.png'));
        //将图片转成base64编码
        resultData.data = `data:image/png;base64,` + Buffer.from(bitmap, 'binary').toString('base64');
        resultData.status = 200;
        resultData.msg = "柱状图获取成功";
        res.send(resultData);
        res.end();
        //删除生成图片，清理痕迹
        //fs.unlinkSync(path.join(__dirname, '../public/images/image.png'));
    } else {
        resultData.data = "";
        resultData.status = 400;
        resultData.msg = "必传字段不可为空";
        res.send(resultData);
        res.end();
    }
});

module.exports = router;
