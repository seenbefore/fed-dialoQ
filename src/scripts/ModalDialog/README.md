# ModalDialog 模态框组件

## 功能说明
ModalDialog 是一个用于动态创建和管理模态框的工具组件。它可以方便地创建自定义内容的模态框，并提供了 Promise 风格的交互方式和事件监听机制。

## 特性
- 支持异步组件加载
- Promise 风格的交互方式
- 支持事件监听（confirm/cancel）
- 自动管理模态框的生命周期
- 支持自定义配置项
- 自动清理 DOM，防止内存泄漏

## 安装和注册

```javascript
import Vue from 'vue'
import modalDialog from '@/scripts/ModalDialog'

Vue.use(modalDialog, {
  // 可选的全局配置项
})
```

## 基本用法

### 1. 创建模态框组件
```vue
<!-- MyDialog.vue -->
<template>
  <div class="my-dialog">
    <h2>{{ title }}</h2>
    <div class="content">
      {{ content }}
    </div>
    <div class="footer">
      <button @click="handleCancel">取消</button>
      <button @click="handleConfirm">确认</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    title: String,
    content: String
  },
  methods: {
    handleCancel() {
      this.$options.cancel?.()
      // or
      // this.$emit('cancel')
    },
    handleConfirm() {
      this.$options.confirm?.({ result: 'success' })
      // or
      // this.$emit('confirm', { result: 'success' })
    }
  }
}
</script>
```

### 2. 使用模态框

#### Promise 方式
```javascript
// 同步组件
this.$modalDialog(MyDialog, {
  title: '提示',
  content: '这是一个模态框'
}).then(result => {
  console.log('用户点击确认', result)
}).catch(error => {
  console.log('用户点击取消', error)
})
```


## API

### modalDialog 方法
```typescript
modalDialog(
  component: Component | (() => Promise<Component>), // 模态框组件或异步组件
  props?: Object, // 传递给模态框组件的 props
): Promise<any>
```


## 注意事项
1. 模态框组件会被自动挂载到 body 元素下
2. 组件会在关闭时自动销毁并清理 DOM
3. 支持同步组件和异步组件两种方式
4. 支持 Promise 和事件监听两种交互方式
5. 事件监听和 Promise 可以同时使用
6. 建议在模态框组件内部处理好样式，避免样式冲突



