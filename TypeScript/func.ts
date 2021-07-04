// 函数声明
function sum_1(x: number, y: number): number {
  return x + y;
}

// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

// 重载，优先从最前面的函数定义开始匹配
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
