let fibo: number[] = [1, 1, 2, 3, 5];
// 数组中允许出现任意类型
let arr: any[] = [1, "2", true];
// 泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// 接口表示类数组
interface NumberArray {
  [index: number]: number;
  length: number;
  // index 是 number 类型, 不会检测其他非 number 类型的 key
  callee: Function;
}
function sum() {
  let args: NumberArray = arguments;
  // or IArguments
  console.log(args);
}
