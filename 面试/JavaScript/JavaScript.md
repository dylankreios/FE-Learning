1. 实现`new`操作符 / `new`操作符干了什么

   ```JavaScript
   function _new() {
     // 获取构造函数，并从参数列表删除
     let Con = [].shift.call(arguments);
     // 创建空对象，并设置原型
     let obj = Object.create(Con.prototype);
     // 以创建的对象为上下文执行构造函数
     let res = Con.apply(obj, arguments);
     // 如果构造函数返回对象，则返回，否则返回刚开始的对象
     return res ? res : obj;
   }
   ```

2. `ES5/ES6` 的继承除了写法以外还有什么区别

   ES6 不仅对实例进行了继承，构造函数也继承

   ```JavaScript
   class Parent {}
   class Child extends Parent {}

   Child.__proto__ === Parent // true
   ```

   ES5 只对实例继承

   ```JavaScript
   function Parent() {}
   function Child() {}
   // Child 继承 Parent
   Child.prototype = new Parent();

   // 构造函数是函数的实例
   Child.__proto__ === Function.prototype // true
   // 原型链
   Child.prototype.__proto__ === Parent.prototype // true
   ```

   `ES5` 和 `ES6` 子类 `this` 生成顺序不同 => 导致 `ES5` 不能继承内置对象

   - `ES5` 先生成子类实例，然后调用父类的构造函数
   - `ES6` 先调用父类的构造函数，再调用子类的构造函数，因此需要在子类构造函数先调用 `super`

   类继承是单一继承结构，只有一个父类；而原型继承本质上是组合，它可以有多个父类，且不会产生层级分类这样的副作用
