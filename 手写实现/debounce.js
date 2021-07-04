/**
 * 防抖
 * @param {*} func
 * @param {*} delay
 * @returns
 */
function debounce(func, delay) {
  let timer = null;
  return function () {
    // 判断定时器是否存在
    if (timer) clearTimeout(timer);
    let that = this;
    let args = arguments;
    timer = setTimeout(() => {
      func.apply(that, args);
    }, delay);
  };
}
