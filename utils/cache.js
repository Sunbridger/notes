'use strict';

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	setCookie: function setCookie(key, value, expiredays, domain, path) {
		var exdate = new Date();
		exdate.setTime(exdate.getTime() + 60 * 60 * 1000 * 24 * expiredays);
		var str = expiredays ? ';expires=' + exdate.toUTCString() : '';
		str += domain ? ';domain=' + domain : '';
		str += path ? ';path=' + path : '';
		document.cookie = key + '=' + escape(value) + str;
	},
	getCookie: function getCookie(key) {
		var arr,
		    reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		}
		return '';
	},
	clearCookie: function clearCookie(name) {
		this.setCookie(name, '', -1);
	},
	getLocalJson: function getLocalJson(key) {
		var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		try {
			return JSON.parse(localStorage.getItem(key)) || defaultValue;
		} catch (e) {
			return defaultValue;
		}
	},
	setLocalJson: function setLocalJson(key, json) {
		if (!json || _base2.default.isEmptyObject(json)) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(json));
		}
	}
}; /**
    *  @desc 缓存模块，包含cookie和localStroage
    *  @note 因为sessionStroage在部分安卓手机存在问题，不建议使用
    *  @create 2016-10-14
    *  @modify 2016-10-14
    *  @author wangkuan
    */
