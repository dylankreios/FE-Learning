// 声明语句中只能定义类型，不能有实现

/**
 * 变量，一般全局用 const
 */
declare const jQuery1: (selector: string) => any;

/**
 * 函数，支持重载声明
 * @param selector
 */
declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;

/**
 * 类
 */
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}

/**
 * 枚举
 */
declare enum Directions1 {
  Up,
  Down,
  Left,
  Right,
}

/**
 * 命名空间，包含嵌套
 */
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  namespace fn {
    function extend(object: any): void;
  }
}
