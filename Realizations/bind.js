/**
 * 实现 bind
 * @returns
 */
Function.prototype.bind =
  Function.prototype.bind ||
  function () {
    // 保存调用函数、绑定对象、绑定的部分参数
    const func = this;
    const thisArg = [].shift.call(arguments);
    const args = [...arguments];
    return function () {
      // 调用函数，并且参数为绑定的加上现在的
      func.apply(thisArg, args.concat([...arguments]));
    };
  };
