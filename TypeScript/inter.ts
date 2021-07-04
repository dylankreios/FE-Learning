interface Person {
  // 只读属性
  readonly name: string;
  // 可选属性
  age?: number;
  // 任意属性
  [propName: string]: string | number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
