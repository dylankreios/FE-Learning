/**
 * 字符串字面量类型
 * 约束取值只能是某几个字符串中的一个，也使用 type 定义
 */

type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames): void {
  console.log(ele, event);
}

handleEvent(document.getElementById("hello"), "scroll");
