/**
 * 枚举类型
 * 用于取值被限定在一定范围内的场景
 */

// 手动赋值
enum Days {
  Sun = 7,
  // 可赋值为浮点数，后续未手动赋值的项的递增步长仍为 1
  Mon = 8.5,
  Tue,
  Wed,
  Thu,
  Fri,
  // 可赋值为非数字，需要使用类型断言来无视类型检查
  Sat = <any>"S",
}

let a = [Days.Sun, Days.Mon];

// 计算所得项
enum Color {
  Red,
  Green,
  Blue = "blue".length,
}

// 常数枚举，会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
