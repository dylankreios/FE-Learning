/**
 * 类型参数之间也可以互相约束
 */

/**
 * 要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段
 * @param target
 * @param source
 * @returns
 */
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
console.log(x);
