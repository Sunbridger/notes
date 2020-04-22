'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *  @desc 基础库
 *  @create 2016-10-14
 *  @modify 2016-10-14
 *  @author wangkuan
 */
module.exports = {
    isEmptyObject: function isEmptyObject(obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    },
    isObject: function isObject(target) {
        return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !this.isArray(target);
    },
    isArray: function isArray(target) {
        return Array.isArray(target);
    },

    // 避免引用,使用的对象复制
    copy: function copy(target) {
        var _this = this;

        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
            return target;
        }
        if (this.isArray(target)) {
            var arr = [];
            for (var i = 0; i < target.length; i++) {
                arr[i] = this.copy(target[i]);
            }
            return arr;
        }
        var obj = {};
        Object.keys(target).forEach(function (key) {
            obj[key] = _this.copy(target[key]);
        });
        return obj;
    }
};