/**
 * 抽象基类
 */
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * 抽象层次更高的读取错误，包括格式与缺失等
 */
class ReadError extends MyError {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
  }
}

class ValidationError extends MyError {}
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property:" + property);
    this.property = property;
  }
}

/**
 * 缺失属性检查
 * @param {*} user
 */
function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

/**
 * 读取 json，抛出错误
 * @param {*} json
 */
function readUser(json) {
  let user;

  // json 格式错误
  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  // json 属性缺失
  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    console.log("Original error: " + e.cause);
  } else {
    throw e;
  }
}
