## Generator

常规函数只会返回单一值（或者不返回任何值）

而 `Generator` 可以按需一个接一个地返回多个值。它们可与 `iterable` 配合使用，从而创建数据流

函数会增加一个 `*` 号

```JavaScript
function* generateSequence() {
  // yield 语句往外抛值
  yield 1;
}
```

`yield` 仅能在 `Generator` 中可以使用，函数外可以用 `next()` 获取下一个值以及状态

`next()` 的结果始终是一个具有两个属性的对象：

- `value`: 产出（`yield`）的值
- `done`: 如果 `generator` 函数已执行完成则为 `true`，否则为 `false`

```JavaScript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();
let one = generator.next();
console.log(JSON.stringify(one)); // {value: 1, done: false}
```

`Generator` 是可迭代的，我们可以使用 `iterator` 的所有相关功能，例如：`spread` 语法 `...`

```JavaScript
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
  // return 的数据不能被迭代，因为 done: true
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value);
}
```

**使用 `Generator` 进行迭代**

对之前可迭代对象的代码使用 `Generator` 重写

```JavaScript
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

console.log([...range]); // [1, 2, 3, 4, 5]
```

重写之后更加简洁

```JavaScript
let range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

console.log([...range]); // [1, 2, 3, 4, 5]
```

**`Generator` 组合**

将 `generator` 彼此 "嵌入" 到一起

例如，有一个生成数字序列的函数：

```JavaScript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
```

现在，想重用它来生成一个更复杂的序列：

- 首先是数字 `0..9`（字符代码为 `48..57`），
- 接下来是大写字母 `A..Z`（字符代码为 `65..90`）
- 接下来是小写字母 `a..z`（字符代码为 `97..122`）

```JavaScript
function* generatePasswordCodes() {
  yield* generateSequence(48, 57);
  yield* generateSequence(65, 90);
  yield* generateSequence(97, 122);
}

let str = "";

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z
```

`yield*` 指令将执行**委托**给另一个 `generator`。意味着 `yield* gen` 在 `generator gen` 上进行迭代，并将其产出（`yield`）的值透明地转发到外部

**`yield` 是一条双向路**

`yield` 不仅可以向外返回结果，而且还可以将外部的值传递到 `generator` 内

调用 `generator.next(arg)`，我们就能将参数 `arg` 传递到 `generator` 内部。这个 `arg` 参数会变成 `yield` 的结果

```JavaScript
function* gen() {
  let ask1 = yield "2 + 2 = ?";
  console.log(ask1); // 4
  let ask2 = yield "3 * 3 = ?"
  console.log(ask2); // 9
}

let generator = gen();
console.log( generator.next().value ); // "2 + 2 = ?"
console.log( generator.next(4).value ); // "3 * 3 = ?"
console.log( generator.next(9).done ); // true
```

外部 `next` 获取的是 `yield` 之后的值，然后下一次调用 `next(arg)` 时，将 `arg` 作为当次 `yield` 返回的值，然后恢复 `generator` 的执行，并返回下一次 `yield` 之后的值：

- `generator.next(4).value` 的 `arg=4` 作为 `ask1` 的值，然后返回 `ask2` 的 `yield` 之后的值

**generator.throw**

外部代码可能会将一个值传递到 `generator`，作为 `yield` 的结果，也可以抛出一个 `error`

```JavaScript
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)
    console.log("The execution does not reach here");
  } catch(e) {
    console.log(e);
  }
}

let generator = gen();
let question = generator.next().value;
// 将 Error 抛到 (1) 处
generator.throw(new Error("The answer is not found"));
```

如果在 `Generator` 没有捕获它，那么它将从 `generator` 掉出到调用代码中，在外面捕获也是可以的

```JavaScript
function* generate() {
  let result = yield "2 + 2 = ?"; // 这行出现 error
}

let generator = generate();
let question = generator.next().value;
try {
  generator.throw(new Error("The answer is not found"));
} catch(e) {
  console.log(e); // 显示这个 error
}
```

`Generator` 优势

- 函数在执行过程中与调用代码交换数据的能力
- 创建可迭代对象

## 异步迭代和 `generator`

异步迭代与常规迭代的区别

- 使用 `Symbol.asyncIterator` 取代 `Symbol.iterator`
- `next()` 方法应该返回一个 `promise`，带有下一个值，并且状态为 `fulfilled`
  > 关键字 `async` 可以实现这一点，我们可以简单地使用 `async next()`
- 应该使用 `for await (let item of iterable)` 循环来迭代这样的对象
  > 注意关键字 `await`

例子：

```JavaScript
let range = {
  from: 1,
  to: 5,
  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,
      async next() {
        // 使用 "await" 等待 1s，模拟异步请求得到的数据
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {
  for await (let value of range) {
    console.log(value); // 1, 2, 3, 4, 5
  }
})()
```

这个 `next()` 方法可以不是 `async` 的，它可以是一个返回值是一个 `promise` 的常规的方法

|                            |           `Iterator`           |                     异步 `iterator`                      |
| :------------------------: | :----------------------------: | :------------------------------------------------------: |
| 提供 `iterator` 的对象方法 |       `Symbol.iterator`        |                  `Symbol.asyncIterator`                  |
|    `next()` 返回的值是     | `{value:.., done: true/false}` | `resolve` 成 `{value:.., done: true/false}` 的 `Promise` |
|       循环使用的方法       |           `for..of`            |                     `for await..of`                      |

> Tips：`spread` 语法和 `for..of` 期望找到 `Symbol.iterator`，因此异步迭代不能用

**异步 `generator` (`finally`)**

作用：创建一个异步生成一系列值的对象

语法以及例子：

```JavaScript
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    console.log(value); // // 1, 2, 3, 4, 5
  }
})();
```

我们可以在其内部使用 `await`，依赖于 `promise`，执行网络请求等任务

> Tips：异步 `generator` 的 `next` 方法获取值时应该使用 `await`，因为返回的是 `promise`

**异步的可迭代对象**

常规的 `generator` 可用作 `Symbol.iterator` 以使迭代代码更短。

与之类似，异步 `generator` 可用作 `Symbol.asyncIterator` 来实现异步迭代

```JavaScript
let range = {
  from: 1,
  to: 5,
  // 等价于 [Symbol.asyncIterator]: async function*() {}
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {
      // 等待一秒
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield value;
    }
  }
};

(async () => {
  for await (let value of range) {
    alert(value);
  }
})();
```

**实际的例子：分页的数据**

从 `Github` 获取 `commit`

- 应该以 `https://api.github.com/repos/<repo>/commits` 格式创建进行 `fetch` 的网络请求，`fetch` 方法允许提供授权和其他 `header`，如果需要 —— 这里 `GitHub` 需要的是 `User-Agent`
- 它返回一个包含 `30` 条 `commit` 的 `JSON`，并在返回的 `Link header` 中提供了指向下一页的链接，它有一个特殊的格式，所以我们对它使用正则表达式
- 我们将接收到的所有 `commit` 一个一个地 `yield` 出来，然后我们可以将该链接用于下一个请求，以获取更多 `commit`

[完整代码](./asyncFetchCommits.js)

|                     |          `Generator`           |                     异步 `Generator`                     |
| :-----------------: | :----------------------------: | :------------------------------------------------------: |
|      声明方式       |          `function*`           |                    `async function*`                     |
| `next()` 返回的值是 | `{value:.., done: true/false}` | `resolve` 成 `{value:.., done: true/false}` 的 `Promise` |
|   循环使用的方法    |           `for..of`            |                     `for await..of`                      |

在 `Web` 开发中，经常会遇到数据流，它们分段流动，这时就很适合使用异步 `Generator`，例如，下载或上传大文件

在浏览器环境还有另一个被称为 `Streams` 的 `API`，它提供了特殊的接口来处理此类数据流
