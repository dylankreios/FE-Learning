// webpack 配置文件，webpack 命令将默认选择使用它，也可使用 --config config.js 选择配置文件
const path = require("path");

module.exports = {
  // 开发环境
  mode: "development",
  // 入口文件：默认 -> src/index.js
  entry: "./src/index.js",
  // 输出配置
  output: {
    // 输出文件名
    filename: "main.js",
    // 输出路径
    path: path.resolve(__dirname, "dist"),
  },
};
