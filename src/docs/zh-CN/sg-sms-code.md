## 短信验证码
:::demo
```html
<template>
    <div class="sg-page-demo">
        <section class="sg-card">
            <section class="sg-card-header">
                <div class="sg-card-title">短信验证码</div>
            </section>
            <section class="sg-card-body">
                <sg-sms-code :count="10"></sg-sms-code>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>
```
:::

### 基础属性

| 参数     | 说明             | 类型   | 可选值 | 默认值            |
| -------- | ---------------- | ------ | ------ | ----------------- |
| auto     | 点击是否立即开始 | auto   | —      | true              |
| count    | 倒计时时长       | Number | —      | 60                |
| label    | 按钮文案         | String | —      | 获取验证码        |
| template | 倒计时文案       | String | —      | 重新获取(second)s |

### 方法

| 事件名称 | 说明       | 回调参数 |
| -------- | ---------- | -------- |
| start    | 倒计时开始 |          |

### 事件

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| click    |      |          |