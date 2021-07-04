/**
 * 对 any 的断言
 * 1. other -> any
 * 2. any -> other
 * 3. other -> any -> another
 */

//1. other -> any：需要添加属性的情况

// window.foo = 1; // error
(window as any).foo = 1;

// 2. any -> other：提高可维护性
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
// 将调用了之后的返回值断言成一个精确的类型
const mike = getCacheData("mike") as Cat;
mike.run();

// 3. other -> any -> another：打破兼容，除非迫不得已，不用双重断言
interface Dog {
  bark(): void;
}
interface Fish {
  swim(): void;
}
function testDog(dog: Dog) {
  return (dog as any as Fish).swim();
}
