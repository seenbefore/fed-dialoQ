## 图片验证码
:::demo
```html
<template>
    <div class="sg-page-demo">
        <section class="sg-card">
            <section class="sg-card-header">
                <div class="sg-card-title">图片验证码</div>
            </section>
            <section class="sg-card-body">
                <sg-img-code :load="fetchCode" :auto="false"></sg-img-code>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                FormView: {
                    model: {},
                    fields: [
                        {
                            class: 'sg-flexbox',
                            fieldType: 'input',
                            name: 'title',
                            label: '自定义模板',
                            placeholder: '请输入',
                            appendSlot: 'code',
                        },
                    ],
                },
            }
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            fetchCode() {
                let code =
                    'data:image/png;base64,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'
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(code)
                    }, 1000)
                })
            },
        },
    }
</script>
```
:::

### 基础属性

| 参数 | 说明         | 类型     | 可选值 | 默认值         |
| ---- | ------------ | -------- | ------ | -------------- |
| auto | 是否自动加载 | Boolean  | —      | true           |
| tip  | 提示         | String   | —      | 看不清？换一张 |
| load | 请求函数     | Function | —      |                |

### 方法

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |


### 事件

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |