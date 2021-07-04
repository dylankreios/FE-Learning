/* _____________ 你的代码 _____________ */
type MyPick<T, K extends keyof T> = { [k in K]: T[k] };

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "../utils/index";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
