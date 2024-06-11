## 组件规范

### 组件名为多个单词
组件名应该始终是多个单词组成（大于等于 2），且命名规范为`KebabCase`格式。
这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

正例：
```
export default {
  name: 'TodoItem'
  // ...
};
```
反例
```
export default {
  name: 'Todo',
  // ...
}
export default {
  name: 'todo-item',
  // ...
}
```

### 组件文件名为 `PascalCase` 格式
正例：
```
components/
|- MyComponent.vue
```
反例
```
components/
|- myComponent.vue
|- my-component.vue
```

### 基础组件文件名为 base 开头，使用完整单词而不是缩写
正例：
```
components/
|- BaseButton.vue
```

### 组件调用
使用自闭合组件

- 局部注册的使用 PascalCase
- 全局注册的使用 kebab-case 方式调用


```html
  <script>
    import MyComponent from '@/components/MyComponent.vue' // 文件名使用 PascalCase 命名法
    export default {
      components: { MyComponent },
    }
  </script>

  <template>
    <div>
      <!-- 局部注册的使用 PascalCase 方式调用（区别于全局注册的，同时又方便选中定位） -->
      <MyComponent></MyComponent>
      <!-- 全局注册的使用 kebab-case 方式调用 -->
      <el-input></el-input>
    </div>
  </template>
  ```


### 组件的 data 必须是一个函数
当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数。 因为如果直接是一个对象的话，子组件之间的属性值会互相影响。

正例：
```
export default {
  data () {
    return {
      name: 'jack'
    }
  }
}
```
反例：
```
export default {
  data: {
    name: 'jack'
  }
}
```

### Prop 定义应该尽量详细

- 必须使用 camelCase 驼峰命名
- 必须指定类型
- 必须加上注释，表明其含义
- 必须加上 required 或者 default，两者二选其一
- 如果有业务需要，必须加上 validator 验证

正例：
```
props: {
  // 组件状态，用于控制组件的颜色
   status: {
     type: String,
     required: true,
     validator: function (value) {
       return [
         'succ',
         'info',
         'error'
       ].indexOf(value) !== -1
     }
   },
    // 用户级别，用于显示皇冠个数
   userLevel：{
      type: String,
      required: true
   }
}
```

### 组件中的 CSS

- 使用 <a target="_blank" href="https://vue-loader.vuejs.org/zh/guide/css-modules.html">CSS Modules</a>，基于如下考虑：

  - 不让外部进行样式重写，避免强耦合 (可通过 props 来处理内部样式的变化)
  - 放心使用简短且语义强的 class 名，无需多余的命名空间

```
<template>
  <button class="btn" :class="$style['btn-close]">X</button>
</template>

<!-- 推荐使用 `module` 特性 而不是`scoped` -->
<style module>
  .btn-close {
    background-color: red;
  }
</style>
```
### 模板中使用简单的表达式
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。

正例：
```
<template>
  <p>{{ normalizedFullName }}</p>
</template>

// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

