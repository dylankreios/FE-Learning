/**
 * 整数取余反转
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x <= 0 || (x > 0 && x % 10 === 0)) {
    return false;
  }
  let temp = x;
  let reverse_x = 0;
  while (temp > 0) {
    reverse_x = reverse_x * 10 + (temp % 10);
    temp = parseInt(temp / 10);
  }
  return x === reverse_x;
};

/**
 * 调用 API
 * @param {*} x
 * @returns
 */
var isPalindrome = function (x) {
  let x_str = x.toString();
  let x_str_reverse = x_str.split("").reverse().join("");
  return x_str === x_str_reverse;
};
