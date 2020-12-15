/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

    const getVal = (l, arr) => {
        if (l.val) {
            arr.push(l1.val, arr);
        }
        if (l.next) {
            getVal(l.next, arr);
        }
    }
    let arr1 = [];
    let arr2 = [];
    getVal(l1, arr1);
    getVal(l2, arr2);
    arr1.reverse();
    arr2.reverse();
    const n = Number(arr1.toString()) + Number(arr2.toString());
    return n;
};
// @lc code=end
