/**
 * hash 表
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const hash = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hash.has(target - nums[i])) {
      return [hash.get(target - nums[i]), i];
    }
    hash.set(nums[i], i);
  }
};

/**
 * 暴力搜索
 * @param {*} nums
 * @param {*} target
 * @returns
 */
var twoSum = function (nums, target) {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (num[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
