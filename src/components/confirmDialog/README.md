# 函数式提醒弹框

## 效果图
![image.png](http://cdn.qiniu.barebear.cn/9b0f935d-d925-4e6b-8c4d-b8407ee5d10f/6e31d48ed98d421b3c740430f.png)

## 代码演示
```javascript
import { useConfirm } from '@/components/confirmDialog/useConfirm'

useConfirm('确认删除吗?').then(() => {
    console.log('删除成功')
}).catch(() => {
    console.log('取消删除')
})

useConfirm(<div class="color-red">确认删除吗</div>).then(() => {
    console.log('删除成功')
}).catch(() => {
    console.log('取消删除')
})

useConfirm({
    message: '停用后将不可使用“规范执法助手”，确定停用吗？',
    title: '停用提醒',
})
.then(() => {
    console.log('confirm')
})
.catch(() => {
    console.log('cancel')
})

useConfirm({
    message: <div class="color-red">停用后将不可使用“规范执法助手，请确定停用吗？</div>,
    title: '停用提醒',
    width: '250px',
    footerCancelText: '取消停用',
    footerConfirmText: '确定停用',
    /* 处理关闭之前的逻辑，done掉用之后会到catch里面 */
    beforeClose: done => {
        setTimeout(() => {
            console.log('?')
            done()
        }, 2000)
    },
    lockScroll: true,
})
.then(() => {
    console.log('confirm')
})
.catch(() => {
    console.log('cancel')
})
```

如果有表单交互，可以使用render函数
```vue
<template>
    <div>
        <button @click="handleClick">点击</button>
    </div>
</template>

<script lang="tsx">
import { useConfirm } from '@/components/confirmDialog/useConfirm'

@Component({
    name: 'UserManage',
})
export default class UserManage extends Vue {
    // 确认框对象
    dialogForm = {
        radioValue: '',
    }
    async handleClick() {
        await useConfirm({
            message: () => (
                <div>
                    <el-radio-group
                        props={{
                            value: this.dialogForm.radioValue,
                        }}
                        on={{
                            input: (val: string) => {
                                this.dialogForm.radioValue = val

                                console.log('radio value changed:', val)
                            },
                        }}
                    >
                        <el-radio props={{ label: '1' }}>男</el-radio>
                        <el-radio props={{ label: '2' }}>女</el-radio>
                    </el-radio-group>
                </div>
            ),
        })
        console.log('dialog result:', this.dialogForm.radioValue)
    }
}
</script>
```

## 带图标的弹框

### 自定义icon和颜色
```javascript
useConfirm({
    message: '停用后将不可使用“规范执法助手”，确定停用吗？',
    title: '停用提醒',
    titleIcon: 'el-icon-question',
    titleIconClass: 'sg-warning-color',
}).then(() => {
    console.log('confirm')
}).catch(() => {
    console.log('cancel')
})
```
#### 效果图
![image.png](http://cdn.qiniu.barebear.cn/ccccd8d2-2088-4829-867c-e20a94db9b11/6e31d48ed98d421b3c740430c.png)


### 内置的代图标的icon

#### info
```javascript
import { useInfoConfirm } from '@/components/confirmDialog/useConfirm'

useInfoConfirm({
    message: '停用后将不可使用“规范执法助手”，确定停用吗？',
    title: '停用提醒',
}).then(() => {
    console.log('confirm')
}).catch(() => {
    console.log('cancel')
})
```

#### 效果图
![image.png](http://cdn.qiniu.barebear.cn/56f24624-f45b-46be-95fb-764e6bff13c9/6e31d48ed98d421b3c740430d.png)


#### warning
```javascript
import { useWarningConfirm } from '@/components/confirmDialog/useConfirm'

useWarningConfirm({
    message: '停用后将不可使用“规范执法助手，请确定停用吗？',
    title: '停用提醒',
}).then(() => {
    console.log('confirm')
}).catch(() => {
    console.log('cancel')
})
```

#### 效果图
![image.png](http://cdn.qiniu.barebear.cn/411b1f68-cb78-40f8-a6a3-bfcbc04aec73/6e31d48ed98d421b3c740430e.png)


#### error
```javascript
import { useErrorConfirm } from '@/components/confirmDialog/useConfirm'

useErrorConfirm({
    message: '停用后将不可使用“规范执法助手，请确定停用吗？',
    title: '停用提醒',
}).then(() => {
    console.log('confirm')
}).catch(() => {
    console.log('cancel')
})
```

#### 效果图
![image.png](http://cdn.qiniu.barebear.cn/67754c1b-7d0b-4a57-90f1-54716781f16e/6e31d48ed98d421b3c7404310.png)


#### success
```javascript
import { useSuccessConfirm } from '@/components/confirmDialog/useConfirm'

useSuccessConfirm({
    message: '停用后将不可使用“规范执法助手，请确定停用吗？',
    title: '停用提醒',
}).then(() => {
    console.log('confirm')
}).catch(() => {
    console.log('cancel')
})
```

#### 效果图
![image.png](http://cdn.qiniu.barebear.cn/0f50c568-3f05-492d-934a-f79d03b1c359/6e31d48ed98d421b3c7404311.png)

## 参数（IUseConfirm）
| 参数                 | 说明                                                                                        | 类型                    | 默认值     |
|:-------------------|:------------------------------------------------------------------------------------------|:----------------------|:--------|
| message            | 弹框内容，支持字符串和一段JSX                                                                          | [String, JSX.Element] |         |
| title              | 弹框标题，支持字符串和一段JSX                                                                          | [String, JSX.Element] | '提示'    |
| titleIcon          | 弹框标题icon，支持字符串和一段JSX                                                                      | [String, JSX.Element] |         |
| titleIconClass     | 弹框标题icon的class，支持字符串和一段JSX                                                                | [String, JSX.Element] |         |
| width              | 弹框的宽度                                                                                     | String                | '390px' |
| closeOnClickModal  | 是否可以通过点击弹框的背景关闭弹框                                                                         | Boolean               | false   |
| closeOnPressEscape | 是否可以通过 `Esc` 按钮弹框的背景关闭弹框                                                                  | Boolean               | true    |
| lockScroll         | 是否锁定滚动条                                                                                   | Boolean               | true    |
| footerCancelText   | 取消按钮的文本                                                                                   | String                | '取消'    |
| footerConfirmText  | 确定按钮的文本                                                                                   | String                | '确认'    |
| beforeClose        | 关闭前的回调函数，与 [ElDialog](https://element.eleme.cn/#/zh-CN/component/dialog) 的 beforeClose 一致 | Function              |         |

