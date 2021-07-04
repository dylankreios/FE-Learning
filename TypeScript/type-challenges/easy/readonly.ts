/* _____________ 你的代码 _____________ */
type MyReadonly<T> = { readonly [k in keyof T]: T[k] };

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "../utils/index";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
}
