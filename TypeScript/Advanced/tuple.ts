/**
 * 元组
 * 数组合并相同类型的对象，元组合并不同类型的对象
 */

let tom1: [string, number] = ["Tom", 25];

// 当向元组添加元素时，类型必须为元组中每个类型的联合类型
// string | number
tom1.push("male");
