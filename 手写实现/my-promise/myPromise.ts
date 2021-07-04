const PENDING: string = "pending";
const FULFILLED: string = "fullfilled";
const REJECTED: string = "rejected";

interface tmpOption {
  resolve: Function;
  reject: Function;
}

interface Options extends tmpOption {
  handlerType: Function;
  thenResult: MyPromise;
  param: any;
}

class MyPromise {
  status: string = PENDING;
  value: any = null;
  reason: any = null;

  onFulfilledCallbacks: Array<Function> = [];
  onRejectedCallbacks: Array<Function> = [];

  constructor(executor: Function) {
    const bindResolve = this.resolve.bind(this);
    const bindReject = this.reject.bind(this);
    // 捕获执行器中的错误
    try {
      executor(bindResolve, bindReject);
    } catch (e) {
      bindReject(e);
    }
  }

  static resolve(param?: any) {
    if (param instanceof MyPromise) {
      return param;
    }
    return new MyPromise((resolve: any) => {
      resolve(param);
    });
  }

  static reject(reason?: any) {
    return new MyPromise((resolve: any, reject: any) => {
      reject(reason);
    });
  }

  resolve(value: any): void {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((func) => func());
    }
  }

  reject(reason: any): void {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((func) => func());
    }
  }

  then(onFulfilled?: Function, onRejected?: Function): MyPromise {
    // 使 then 参数可选
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v: any) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r: any) => {
            throw r;
          };

    // 解决 then 链式调用：返回类实例
    const thenResult = new MyPromise((resolve: any, reject: any): void => {
      const tmpOption: tmpOption = { resolve: resolve, reject: reject };
      // 保证 this 指向
      const that = this;
      const fullfilledMicrotask = () => {
        queueMicrotask(() => {
          thenFuncHandler({ ...tmpOption, handlerType: onFulfilled, thenResult, param: that.value });
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          thenFuncHandler({ ...tmpOption, handlerType: onRejected, thenResult, param: that.reason });
        });
      };

      if (this.status === FULFILLED) {
        // 加入微任务等待 thenResult 初始化完成
        fullfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 执行器执行异步代码时调用 then 状态为 pending
        // 解决 then 多次调用：放入回调队列
        this.onFulfilledCallbacks.push(fullfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return thenResult;
  }
}

function thenFuncHandler(options: Options) {
  // 捕获 then 执行的错误
  try {
    const result = options.handlerType(options.param);

    // 解决 then 中返回 then 执行结果导致环
    if (result === options.thenResult) {
      options.reject(new TypeError("promise 链产生环"));
    } else {
      // 判断返回值是否为 promise 对象
      result instanceof MyPromise ? result.then(options.resolve, options.reject) : options.resolve(result);
    }
  } catch (e) {
    options.reject(e);
  }
}

export default MyPromise;
