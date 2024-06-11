JavaScript 基础非常重要，而且也有很多细节问题。

* [ ] 执行上下文、作用域链、闭包

  * [ ] JavaScript 中的执行上下文
  * [ ] JavaScript 的作用域链
  * [ ] JavaScript 的闭包应用场景

* [ ] this、call、apply、bind
  * [ ] JavaScript 中的 this
  * [ ] 改变this指针
  * [ ] call 和 apply 的区别
  * [ ] 实现 call 和 apply
  * [ ] 实现 bind

* [ ] DOM 事件机制
* [ ] 原型/继承
  * [ ] 原型概念
  * [ ] 原型链
  * [ ] 原型实现继承

* [ ] Promise
  * [ ] 概念
  * [ ] 实现 Promise (promise A+)
  * [ ] async await

* [ ] 深浅拷贝
  * [ ] 概念
  * [ ] 实现
  * [ ] 注意问题
  * [ ] 循环引用问题

* [ ] 事件循环（Event Loop）机制
  * [ ] 宏任务&微任务
  * [ ] 事件发布订阅

* [ ] 防抖与节流
* [ ] 函数式编程
* [ ] service worker/Web Worker

### 变量和类型
● JavaScript 中规定了哪几种数据类型？

● JavaScript 中的各种类型的变量在内存中的存储形式是什么样的？

● 变量类型 Symbol 到底该在什么时候使用？怎么使用？

● 有哪些判断 JavaScript 数据类型的方式，以及他们的优缺点？如何使用这些方式判断所有的数据类型？

● JavaScript 中常用的类型转换规则是怎样的？

● 对象的深拷贝和浅拷贝实现方式及应用场景？

● 对象到原始值的转换方式及如何自定义？([https://zh.javascript.info/object-toprimitive](https://zh.javascript.info/object-toprimitive))

● 原始类型的对象包装器是什么？（[https://zh.javascript.info/primitives-methods](https://zh.javascript.info/primitives-methods)）

● 理解对象中属性的 setter 和 getter 以及它们能带来什么好处？

● 数字类型中例如  0.1 + 0.2 不等于 0.3 的原因是什么？IEEE-754理解？([https://zh.javascript.info/number](https://zh.javascript.info/number))

### 函数
● JavaScript 中的函数在内存中的存储形式是什么样的？

● 函数声明和命名函数表达式的区别？（[https://zh.javascript.info/function-object#shu-xing-name](https://zh.javascript.info/function-object#shu-xing-name)）

● 箭头函数与普通函数的区别？（[https://zh.javascript.info/arrow-functions](https://zh.javascript.info/arrow-functions)）

● this 、构造器和 new 操作符如何联系在一起理解？手写一个 new 的实现？

● JavaScript 中的函数对象有哪些属性？有什么应用场景？（[https://zh.javascript.info/function-object#shu-xing-name](https://zh.javascript.info/function-object#shu-xing-name)）

● 运用函数的装饰器模式优化性能，并从中理解 call/apply 的使用？最好能手写 call/apply 的实现？（[https://zh.javascript.info/call-apply-decorators， https://zh.javascript.info/proxy#proxy-apply](https://zh.javascript.info/call-apply-decorators， https://zh.javascript.info/proxy#proxy-apply)）

● 什么是函数绑定，有什么作用？理解 bind 的使用？最好能手写 bind 的实现？（[https://zh.javascript.info/bind](https://zh.javascript.info/bind)）

### 原型和原型链
● 深入理解原型继承， F.prototype 与 F.__proto__ 是什么关系 ？（[https://zh.javascript.info/prototype-inheritance](https://zh.javascript.info/prototype-inheritance)， [https://zh.javascript.info/function-prototype](https://zh.javascript.info/function-prototype)， [https://zh.javascript.info/prototype-methods](https://zh.javascript.info/prototype-methods)）

● 通过原型链理解 alert([1, 2, 3]) 打印出 1,2,3 ，而 alert({}) 却打印出 [object Object] ？（[https://zh.javascript.info/native-prototypes#objectprototype](https://zh.javascript.info/native-prototypes#objectprototype)）

● 理解 class 构造以及继承的底层实现原理？([https://zh.javascript.info/class](https://zh.javascript.info/class)，[https://zh.javascript.info/class-inheritance](https://zh.javascript.info/class-inheritance))

● 为什么说 class 被视为一种定义构造器及其原型方法的语法糖？它与函数模拟实现有什么差异吗？（[https://zh.javascript.info/class#bu-jin-jin-shi-yu-fa-tang](https://zh.javascript.info/class#bu-jin-jin-shi-yu-fa-tang)）

● class 中的静态、私有、受保护、公共属性的使用及场景？

### 作用域和闭包

● 理解 JavaScript 的执行上下文栈，可以应用堆栈信息快速定位问题？

● 理解 JavaScript 的作用域和作用域链？

● 深入理解闭包，为什么 JavaScript 中所有函数都是闭包的？理解关于 [[Environment]] 属性和词法环境原理的技术细节？（[https://zh.javascript.info/closure](https://zh.javascript.info/closure)）

● 了解 JavaScript 各种模块化（AMD、UMD、CommonJS、ESModule）方式及它们之间的区别？如何分别进行导入、导出？

### 执行机制
● 深入理解错误处理方式 try..catch..finally ？如何自定义 Error？（[https://zh.javascript.info/try-catch](https://zh.javascript.info/try-catch)，[https://zh.javascript.info/custom-errors](https://zh.javascript.info/custom-errors)）

● 掌握 Promise 所有的使用方式，并能手写其实现源码？

● JavaScript 如何实现异步编程，可以详细描述 EventLoop 机制？

● 事件循环：宏任务和微任务？([https://zh.javascript.info/event-loop](https://zh.javascript.info/event-loop))


### 语法与API
● 数组和类数组区别到底在于哪里？

● for...of 的原理及它是如何遍历可迭代对象的？如何自定义可迭代对象？（[https://zh.javascript.info/iterable](https://zh.javascript.info/iterable)）

● Array.from 是如何接收可迭代对象或类数组将其转为数组的？

● setInterval 执行间隔时间问题，如何使用 settimeout 实现 setInterval ？（[https://zh.javascript.info/settimeout-setinterval](https://zh.javascript.info/settimeout-setinterval)）

● JavaScript 提供的正则 API，熟练手写常用的正则表达式。

● Proxy 和 Reflect 的使用方式及场景？（[https://zh.javascript.info/proxy](https://zh.javascript.info/proxy)）([https://juejin.cn/post/6924442692667572237](https://juejin.cn/post/6924442692667572237))