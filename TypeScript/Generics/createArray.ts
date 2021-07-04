/**
 * 数组中每一项都应该是输入的 value 的类型
 * @param length
 * @param value
 * @returns
 */
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray<string>(3, "x");
