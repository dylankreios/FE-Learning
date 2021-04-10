/**
 * 实现 new 操作符
 * @returns
 */
function _new() {
  // 获取构造函数，并从参数列表删除
  let Con = [].shift.call(arguments);
  // 创建空对象，并设置原型
  let obj = Object.create(Con.prototype);
  // 以创建的对象为上下文执行构造函数
  let res = Con.apply(obj, arguments);
  // 如果构造函数返回对象，则返回，否则返回刚开始的对象
  return res ? res : obj;
}
