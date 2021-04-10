/**
 * 猎人类
 * @param {*} name
 * @param {*} level
 */
function Hunter(name, level) {
  this.name = name;
  this.level = level;
  this.subcribeList = [];
}

/**
 * 订阅
 * @param {*} target 订阅目标
 * @param {*} func 目标发布事件后执行的函数
 */
Hunter.prototype.subcribe = function (target, func) {
  console.log(`${this.name}订阅了${target.name}`);
  target.subcribeList.push(func);
};

/**
 * 发布
 * @param {*} money 发布的赏金
 */
Hunter.prototype.publish = function (money) {
  console.log(`${this.name}发布赏金 ${money} 元`);
  this.subcribeList.forEach((handler) => handler(money));
};

// 实例化三个猎人
let zhang = new Hunter("张三", "白银");
let li = new Hunter("李四", "黄金");
let wang = new Hunter("王五", "铂金");

// 李四和王五订阅张三
li.subcribe(zhang, (money) => console.log(`${li.name}接受 ${money} 元悬赏`));
wang.subcribe(zhang, (money) =>
  console.log(`${wang.name}接受 ${money} 元悬赏`)
);

// 张三发布悬赏
zhang.publish(50);
