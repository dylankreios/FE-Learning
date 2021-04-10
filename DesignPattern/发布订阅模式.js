/**
 * 猎人联盟
 */
let hunterUnion = {
  topics: Object.create(null),
  subcribe(topic, func) {
    this.topics[topic] = this.topics[topic] || [];
    this.topics[topic].push(func);
  },
  publish(topic, money) {
    if (this.topics[topic]) {
      this.topics[topic].forEach((handler) => handler(money));
    }
  },
};

/**
 * 猎人类
 * @param {*} name
 * @param {*} level
 */
function Hunter(name, level) {
  this.name = name;
  this.level = level;
}

/**
 * 订阅
 * @param {*} topic 订阅主题
 * @param {*} func 目标主题发布后执行的函数
 */
Hunter.prototype.subcribe = function (topic, func) {
  console.log(`${this.name}订阅了任务：${topic}`);
  hunterUnion.subcribe(topic, func);
};

/**
 * 发布
 * @param {*} topic 发布主题
 * @param {*} money 目标主题赏金
 */
Hunter.prototype.publish = function (topic, money) {
  console.log(`${this.name}发布了任务${topic}`);
  hunterUnion.publish(topic, money);
};

// 实例化三个猎人
let zhang = new Hunter("张三", "白银");
let li = new Hunter("李四", "黄金");
let wang = new Hunter("王五", "铂金");

// 李四和王五订阅张三
li.subcribe("吃饭", (money) => console.log(`${li.name}接受 ${money} 元悬赏`));
wang.subcribe("睡觉", (money) =>
  console.log(`${wang.name}接受 ${money} 元悬赏`)
);

// 张三发布悬赏
zhang.publish("吃饭", 50);
