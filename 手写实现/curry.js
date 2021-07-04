/**
 * 柯里化
 * @param {*} func
 * @returns
 */
function curry(func) {
  return function curried(...args) {
    // 如果给的参数大于原函数
    if (args.length >= func.length) {
      // 直接执行
      return func.apply(this, args);
    } else {
      // 否则返回一个偏函数
      return function (...args2) {
        // 继续将偏函数的参数传入 curried 判断剩下的参数
        return curried(this, args.concat(args2));
      };
    }
  };
}
