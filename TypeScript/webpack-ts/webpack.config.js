const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // 设置打包环境
    environment: {
      // 不用箭头函数
      arrowFunction: false,
    },
  },
  // 配置打包使用的模块
  module: {
    // 加载规则
    rules: [
      {
        // 匹配文件类型
        test: /\.ts$/,
        // 使用 loader，倒序加载
        use: [
          {
            loader: "babel-loader",
            // 配置选项
            options: {
              // 预设置
              presets: [
                [
                  // 设置环境
                  "@babel/preset-env",
                  // 设置其他选项
                  {
                    // 需要兼容的目标浏览器
                    targets: {
                      chrome: 58,
                      ie: 11,
                    },
                    // corejs 版本
                    corejs: 3,
                    //  corejs 使用方式：按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 排除文件夹
        exclude: /node_modules/,
      },
    ],
  },
  // 配置打包使用的插件
  plugins: [
    new htmlWebpackPlugin({
      // title: "自定义 title",
      // 生成 html 使用的模板
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],

  // 设置引入模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
