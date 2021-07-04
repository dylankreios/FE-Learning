/**
 * 使用 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状
 */
interface Lengthwise {
  length: number;
}

/**
 * 约束只能传入包含 length 的参数
 * @param arg
 * @returns
 */
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("touryung");
