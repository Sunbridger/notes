'use strict';

/**
 *  @desc 日期库
 *  @create 2016-10-14
 *  @modify 2016-10-14
 *  @author wangkuan
 *  @author chentongta
 */
module.exports = {
    /**
     * 格式化时间函数，create by chentongta。
     *
     * @param  String  value    [时间戳，字符串和number类型都可以，以毫秒或者以秒为单位]
     * @param  String  format   [格式化的结构，常见填'YYYY/MM/DD hh:mm:ss+S'，最多可精确到毫秒级别]
     * @return String           [参照format的格式化结果]
     */
    formatTime: function formatTime(value, format) {
        if (!value || +value !== +value) {
            return value;
        }
        if (value.toString().length === 10) {
            value = +value * 1000;
        }
        var date = new Date(value);
        var o = {
            'M+': date.getMonth() + 1, //month
            'D+': date.getDate(), //day
            'h+': date.getHours(), //hour
            'm+': date.getMinutes(), //minute
            's+': date.getSeconds(), //second
            'S': date.getMilliseconds() //millisecond
        };

        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    },
    /**
     * 剩余时间
     *
     * @param  Number    startT  [开始时间戳]
     * @param  Number    endT    [结束时间戳]
     * @param  Function  cb      [每秒钟触发一次回调函数]
     *
     */
    remainTime: function remainTime(startTime, endTime, cb) {
        var sysDis = Date.now() - startTime; // 系统时间差
        function countdown(startT, endT) {
            var disT = endT - startT;
            if (disT <= 0) {
                clearInterval(timer);
                return cb({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
            var days = parseInt(disT / 60 / 60 / 24 / 1000);
            var hours = parseInt(disT / 1000 / 60 / 60 % 24);
            var minutes = parseInt(disT / 1000 / 60 % 60);
            var seconds = parseInt(disT / 1000 % 60);
            cb({ days: days, hours: hours, minutes: minutes, seconds: seconds, timer: timer });
        }
        var timer = setInterval(function () {
            countdown(Date.now() - sysDis, endTime);
        }, 1000);
        countdown(Date.now() - sysDis, endTime);
    }
};
