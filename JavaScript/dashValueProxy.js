let user = {
  name: "John",
  _password: "***",
};

user = new Proxy(user, {
  get(target, prop) {
    // 拦截属性读取
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    // 如果是函数，绑定原对象上下文，否则例如调用 user.checkPassword() 时，
    // 被代理的 user 会作为 this，触发 get 捕获器，会抛出错误
    return typeof value === "function" ? value.bind(target) : value;
  },
  set(target, prop, val) {
    // 拦截属性写入
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    // 拦截属性删除
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    // 拦截读取属性列表
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

// "get" 不允许读取 _password
try {
  console.log(user._password); // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "set" 不允许写入 _password
try {
  user._password = "test"; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "deleteProperty" 不允许删除 _password
try {
  delete user._password; // Error: Access denied
} catch (e) {
  console.log(e.message);
}

// "ownKeys" 将 _password 过滤出去
for (let key in user) {
  console.log(key);
} // name
