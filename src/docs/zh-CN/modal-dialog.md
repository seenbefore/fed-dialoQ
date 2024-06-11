## 示例代码

#### 1、弹窗使用样例代码

```vue
<template>
  <div class="home">
    <el-button type="primary" @click="openDialog1()">
      打开弹窗1
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'About',
  methods: {
    openDialog1() {
      this.$modalDialog(
        () =>
          import(/* webpackChunkName: "dialog1" */ './demo-dialog/dialog1.vue'),
        { content: '我是弹窗1的内容' }
      ).then(
        res => {
            console.log(res)
        },
        res => {
            console.log(res)
        },
      )
    },
  },
}
</script>
```

#### 2、弹窗内部样例代码

```vue
<template>
  <el-dialog title="弹窗1" visible @close="cancel">
    我是弹窗1
    <p v-text="content"></p>
    <el-button type="primary" @click="confirm">确定</el-button>
  </el-dialog>
</template>
<script>
export default {
  name: 'dialog1',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  methods: {
    cancel() {
        this.$options.cancel('取消/关闭')
    },
    confirm() {
        this.$options.confirm('确定')
    },
  },
}
</script>
```

## 动态弹窗加载方法

 `this.$modalDialog(component, props) -> {Promise}`

## 方法参数

* 该方法接口两个参数，第一参数为组件对象，也可以是异步组件；第二参数为props，及对应组件中定义props。返回一个Promise类型。
* 使用该方法打开的弹窗，在弹窗内部可以使用this.$options.cancel()关闭弹窗后，会走promise的reject状态; this.$options.confirm()关闭弹窗后会走promise的resolve状态。
* this.$options.cancel()、this.$options.confirm()均可接受一个参数。
