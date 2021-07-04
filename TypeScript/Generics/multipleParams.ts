/**
 * 多个类型参数
 * @param tuple
 * @returns
 */
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap<number, string>([7, "seven"]);
