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
    let res = new ListNode(-1),
    cur = res,
    carry = 0;
while(l1 !== null || l2 !== null){
    //取到两个链表当前的数值
    let num1 = l1 == null ? 0 : l1.val;
    let num2 = l2 == null ? 0 : l2.val;
    //求和
    let sum = num1 + num2 + carry;
    //对进位标志的验证
    carry = sum >= 10 ? 1 : 0;
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
}
if (carry === 1) {
    cur.next = new ListNode(1);
}
return res.next;
}
// @lc code=end
