## 概括

`webpack` 是一个用于现代 `JavaScript` 应用程序的**静态模块打包**工具

当 `webpack` 处理应用程序时，它会在内部构建一个**依赖图**，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 `bundle`

## 入口起点

入口起点指示 `webpack` 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，`webpack` 会找出有哪些模块和库是入口起点依赖的

**单入口写法**

```JavaScript
// webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

```JavaScript
// webpack.config.js
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
```

也可以将一个文件路径**数组**传递给 `entry` 属性，这将创建一个所谓的 `"multi-main entry"`。在想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 `"chunk"` 中时，这种方式很有用

```JavaScript
// webpack.config.js
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```
