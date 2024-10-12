## 函数式弹框

## 效果图
![image.png](http://cdn.qiniu.barebear.cn/0f80578d-6e98-408b-93bd-93480289b5a2/6e31d48ed98d421b3c740431e.png)

## 代码演示
### 基础使用方式
```javascript
import { useFunctionalDialog } from '@/components/functionalDialog/useFunctionalDialog'

/* 基础使用方式打开一个弹框 */
useFunctionalDialog<string>(() => import('../laws-unscramble-library/index.vue'))
    .then(args => {
        console.log('confirm', args)
    })
    .catch(() => {
        console.log('cancel')
    })
```
![image.png](http://cdn.qiniu.barebear.cn/9106d48f-fa5f-432d-9e37-12a220ae1424/6e31d48ed98d421b3c740431f.png)

### 非单文件组件使用方式

```javascript
import { useFunctionalDialog } from '@/components/functionalDialog/useFunctionalDialog'

/* tsx方式打开一个弹框 */
useFunctionalDialog({
    render: () => <div>内容</div>,
}).then(() => {
    console.log('successfully')
})

/* h方式打开一个弹框 */
useFunctionalDialog({
    render: (h) => h('div', '内容'),
}).then(() => {
    console.log('successfully')
})

```



### 自定义弹框内容如何手动关闭弹框
- 在弹框打开的组件内部抛出对应的事件即可关闭弹框
  - FunctionalDialogEventEnum.CONFIRM
    - 相当于是点击确认关闭弹框：`this.$emit(FunctionalDialogEventEnum.CONFIRM)`
  - FunctionalDialogEventEnum.CANCEL
    - 相当于是点击取消关闭弹框：`this.$emit(FunctionalDialogEventEnum.CANCEL)`
- 参数传递
  - `this.$emit(FunctionalDialogEventEnum.CONFIRM, '参数1')`
    - `参数1` 会作为参数传递给then回调，catch同理
  - `this.$emit(FunctionalDialogEventEnum.CONFIRM, '参数1', '参数2')`
    - `['参数1', '参数2']` 会作为数组参数传递给then回调，catch同理
  - 注意事项：在只有一个参数的情况下，不会作为数组传递给回调，只有多个参数的情况下才会作为数组传递给回调

__`../laws-unscramble-library/index.vue`__
```javascript
<template>
    <div>
        这是弹框内容
        <el-button @click="confirm">关闭弹框-确认</el-button>
        <el-button @click="close">关闭弹框-取消</el-button>
    </div>
</template>

<script lang="ts">
import { FunctionalDialogEventEnum } from '@/components/functionalDialog/useFunctionalDialog'
// .....
public confirm() {
    /* 手动关闭弹框，FunctionalDialogEventEnum.CONFIRM。会触发then的回调 */
    this.$emit(FunctionalDialogEventEnum.CONFIRM, '参数1', '参数2') 
}

public close() {
    /* 手动关闭弹框 FunctionalDialogEventEnum.CANCEL会触发catch回调 */
    this.$emit(FunctionalDialogEventEnum.CANCEL, '参数1')
}
</script>
```

```javascript
useFunctionalDialog<string>(() => import('../laws-unscramble-library/index.vue'))
    .then(args => {
        /* FunctionalDialogEventEnum.CONFIRM */
        console.log('confirm', args[0], args[1])
    })
    .catch(() => {
        /* FunctionalDialogEventEnum.CANCEL */
        console.log('cancel')
    })
```

### 给子组件传递参数
1. 需要打开的弹框组件通过 prop 定义需要接受的参数
2. 打开的弹框组件通过 `options` 传递参数

```javascript
useFunctionalDialog<string>(() => import('../laws-unscramble-library/index.vue'), {
    /* 通过 options 传递参数 */
    options: {
        title: '这是传递的标题',
    },
})
.then(args => {
    console.log('confirm', args)
})
.catch(() => {
    console.log('cancel')
})
```

__`../laws-unscramble-library/index.vue`__
```javascript
<template>
    <div>
        这是弹框内容
        这是传递的内容: {{ title }}
        <el-button @click="confirm">关闭弹框-确认</el-button>
        <el-button @click="close">关闭弹框-取消</el-button>
    </div>
</template>

<script lang="ts">
import { FunctionalDialogEventEnum } from '@/components/functionalDialog/useFunctionalDialog'
// .....
// 接收参数
@Prop({ type: String })
public title!: string

public confirm() {
    this.$emit(FunctionalDialogEventEnum.CONFIRM, '参数1', '参数2') 
}

public close() {
    this.$emit(FunctionalDialogEventEnum.CANCEL, '参数1')
}
</script>
```


## API
### IUseFunctionalDialog
| 参数             | 说明                                                                                      | 类型                    | 默认值                                          |
|----------------|-----------------------------------------------------------------------------------------|-----------------------|----------------------------------------------|
| options        | 传递给弹框内部组件的参数                                                                            | Record<string, any>   | undefined                                    |
| showCancelBtn  | 是否展示取消按钮                                                                                | Boolean               | true                                         |
| showConfirmBtn | 是否展示确认按钮                                                                                | Boolean               | true                                         |
| confirmBtnText | 确认按钮文本                                                                                  | String                | '确认'                                         |
| cancelBtnText  | 取消按钮文本                                                                                  | String                | '取消'                                         |                                   |
| title          | 标题。可以设置tsx                                                                              | [String, JSX.Element] | ''                                           |
| 其他参数           | 支持 [ElDialog](https://element.eleme.cn/#/zh-CN/component/dialog)的参数，可参考：DialogPropsType | DialogPropsType       | { visible: true, closeOnClickModal: false, } | 

### useFunctionalDialog
`useFunctionalDialog<T>(children: AsyncFunction, options?: Partial<IUseFunctionalDialog>): Promise<T>;`
