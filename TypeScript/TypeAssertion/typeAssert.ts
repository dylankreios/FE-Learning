// 将一个联合类型断言为其中一个类型
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

// 在还不确定类型的时候就访问其中一个类型特有的属性或方法，断言消除警告
function isFish(animal: Cat | Fish) {
  // 而不是 animal.swim
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}

// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
interface Animal {
  name: string;
}
interface Dog extends Animal {
  run(): void;
}
// 此处，Animal 兼容 Dog
function testAnimal(animal: Animal) {
  return animal as Dog;
}
function testCat(dog: Dog) {
  return dog as Animal;
}
