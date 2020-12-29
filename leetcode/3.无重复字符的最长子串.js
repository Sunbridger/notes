/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
 const arr = s.split('');
 if (!arr.length) return 0;
 const newResult = [];
 let len = 0;
 let mapobj = {};
 arr.forEach((el, index) => {

    if (mapobj[el]) {
        mapobj = {};
        newResult.push(len);
        len = 0;
    } else if (index === arr.length - 1) {
        newResult.push(len + 1);
    } else {
        len++;
        mapobj[el] = true;
    }
 });
 return newResult.sort((a, b) => b - a)[0];

};
// @lc code=end
console.log(lengthOfLongestSubstring('bbbbb'))
