/**
 * 节流：时间戳版
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function throttle(func, delay) {
  let prev = Date.now();
  return function () {
    const current = Date.now();
    // 达到时间阈值才执行
    if (current - prev >= delay) {
      func.apply(this, arguments);
      // 执行完之后更新当前时间
      prev = Date.now();
    }
  };
}

/**
 * 节流：定时器版
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function throttle(func, delay) {
  let timer = null;
  return function () {
    // 正在定时期间不能进入
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, arguments);
      // 定时结束后取消定时器，以便下次设置
      timer = null;
    }, delay);
  };
}
