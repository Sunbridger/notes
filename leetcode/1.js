/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    let result = [];
    nums.forEach((value, index) => {
        const t = target - value;
        if (map.has(t)) {
            result = [index, map.get(t)];
        } else {
            map.set(value, index);
        }
    });
    return result;
};
let a = twoSum([2, 9, 11,7, 15], 9);
console.log(a);
