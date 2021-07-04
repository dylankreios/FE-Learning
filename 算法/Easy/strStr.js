/**
 * 暴力算法
 * @param {*} haystack
 * @param {*} needle
 * @returns
 */
var strStr = function (haystack, needle) {
  const h_len = haystack.length;
  const n_len = needle.length;
  for (let i = 0; i < h_len - n_len + 1; i++) {
    for (let j = 0; j < n_len; j++) {
      if (needle[j] !== haystack[i + j]) {
        break;
      }
    }
    if (j === n_len) {
      return i;
    }
  }
  return -1;
};

/**
 * 调用 slice API
 * @param {*} haystack
 * @param {*} needle
 * @returns
 */
var strStr = function (haystack, needle) {
  const h_len = haystack.length;
  const n_len = needle.length;
  for (let i = 0; i < h_len - n_len; i++) {
    if (haystack.slice(i, i + n_len) === needle) {
      return i;
    }
  }
  return -1;
};

/**
 * 双指针法
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let p = 0;
  let j = 0;
  const h_len = haystack.length;
  const n_len = needle.length;

  while (p < h_len - n_len && j < n_len) {
    if (haystack[p + j] === needle[j]) {
      j++;
    } else {
      j = 0;
      p++;
    }
  }

  return j == needle.length ? p : -1;
};

/**
 * KMP 算法
 * @param {*} haystack
 * @param {*} needle
 * @returns
 */
var strStr = function (haystack, needle) {
  const h_len = haystack.length;
  const n_len = needle.length;

  if (n_len === 0) {
    return 0;
  }
  if (h_len === 0) {
    return -1;
  }

  // dp[状态][字符] = 下个状态
  let dp = [];
  for (let i = 0; i < n_len; i++) {
    dp[i] = [];
  }

  // 状态 0 的转移
  for (let i = 0; i < 128; i++) {
    dp[0][i] = 0;
  }
  dp[0][needle.charCodeAt(0)] = 1;

  let X = 0;
  // 构建状态转移图
  for (let j = 1; j < n_len; j++) {
    for (let c = 0; c < 128; c++) {
      // 先假设所有状态都回退
      dp[j][c] = dp[X][c];
    }
    // 更新状态推进的情况
    dp[j][needle.charCodeAt(j)] = j + 1;
    // 更新最近的状态重启位置
    // 为下一个状态的回退做准备
    X = dp[X][needle.charCodeAt(j)];
  }

  // 初始状态
  let j = 0;
  for (let i = 0; i < h_len; i++) {
    // 当前是状态 j，遇到 haystack[i] 之后更新状态
    j = dp[j][haystack.charCodeAt(i)];
    if (j == n_len) {
      return i - n_len + 1;
    }
  }
  return -1;
};
