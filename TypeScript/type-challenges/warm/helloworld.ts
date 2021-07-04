/* _____________ 你的代码 _____________ */
type HelloWorld = string;

/* _____________ 测试用例 _____________ */
import { Equal, Expect, NotAny } from "../utils/index";

type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>];
