/*
* @Author: hudichao
* @Date:   2016-12-23 11:33:18
* @Last Modified by:   hudichao
* @Last Modified time: 2016-12-23 15:53:51
*/

'use strict';

function accDiv(arg1, arg2) {
    var r1, r2;
    var t1 = 0;
    var t2 = 0;

    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {}

    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {}

    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return moveDecimalPoint(r1 / r2, t2 - t1);
}

function accMul(arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();

    try {
        m += s1.split('.')[1].length;
    } catch (e) {}

    try {
        m += s2.split('.')[1].length;
    } catch (e) {}

    return moveDecimalPoint(Number(s1.replace('.', '')) * Number(s2.replace('.', '')), -m);
}

function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }

    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }

    m = Math.max(r1, r2);
    return moveDecimalPoint(moveDecimalPoint(arg1, m) + moveDecimalPoint(arg2, m), -m);
}

function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }

    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }

    m = Math.max(r1, r2);
    return moveDecimalPoint(moveDecimalPoint(arg1, m) - moveDecimalPoint(arg2, m), -m);
}

var process = {
    accAdd: accAdd,
    accSub: accSub,
    accMul: accMul,
    accDiv: accDiv
};

function compute(arg1, operator, number) {
    if (arg1 === undefined) {
        return undefined;
    }
    var operatorStr;
    switch (operator) {
        case '+':
            operatorStr = 'accAdd';
            break;
        case '-':
            operatorStr = 'accSub';
            break;
        case '*':
            operatorStr = 'accMul';
            break;
        case '/':
            operatorStr = 'accDiv';
            break;
    }
    if (!operatorStr) {
        console.error('程序错误，输入+-*/中的一个');
        return;
    }
    return process[operatorStr](arg1, number);
}

// position 大于0 小数点往右移动,小于0 小数点往左移动
function moveDecimalPoint(number, position) {
    var isNegative = number < 0 ? true : false;
    var numberStr = String(Math.abs(number));
    if (position > 0) {
        var floatString = numberStr.split('.')[1];
        var floatLength = floatString ? floatString.length : 0;
        var zeroCount = position - floatLength;
        if (zeroCount >= 0) {
            var i = 0;
            while (i++ < zeroCount) {
                numberStr = numberStr + '0';
            }
            return isNegative ? -Number(numberStr.replace('.', '')) : Number(numberStr.replace('.', ''));
        } else {
            var absZeroCount = Math.abs(zeroCount);
            var integerStr = numberStr.replace('.', '');
            var result = integerStr.substr(0, integerStr.length - absZeroCount) + '.' + integerStr.substr(integerStr.length - absZeroCount, absZeroCount);
            return isNegative ? -Number(result) : Number(result);
        }
    } else if (position < 0) {
        var _integerStr = numberStr.split('.')[0];
        var integerLength = _integerStr ? _integerStr.length : 0;
        var _zeroCount = Math.abs(position) - integerLength;
        if (_zeroCount >= 0) {
            var _i = 0;
            while (_i++ < _zeroCount) {
                numberStr = '0' + numberStr;
            }
            var _result = numberStr.replace('.', '');
            return isNegative ? -Number('0.' + _result) : Number('0.' + _result);
        } else {
            var _absZeroCount = Math.abs(_zeroCount);
            var integer = numberStr.replace('.', '');
            var _result2 = integer.substr(0, _absZeroCount) + '.' + integer.substr(_absZeroCount, integer.length - _absZeroCount);
            return isNegative ? -Number(_result2) : Number(_result2);
        }
    }
    return number;
}

module.exports = {
    compute: compute
};
