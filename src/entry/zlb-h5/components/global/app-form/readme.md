## 移动端信息录入表单

### 基础属性

| 参数            | 说明                 | 类型                 | 可选值       | 默认值 |
| --------------- | -------------------- | -------------------- | ------------ | ------ |
| value / v-model | 绑定值               | object               | —            | -      |
| fields          | 列配置               | [GroupField]/[Field] | -            | -      |
| showFootBtns    | 底部按钮显隐         | boolean              | -            | true   |
| disabled        | 全局禁用             | boolean              | —            | false  |
| forceSameSet    | 强制设成一个分组     | boolean              | —            | false  |
| httpRequest     | 自定义 http          | Function             | -          | -      |
| extraParams     | 自定义函数里额外参数 | object               | —            | -      |

### 方法

| 方法名称             | 说明                                       | 参数                                                  |
| -------------------- | ------------------------------------------ | ----------------------------------------------------- |
| getRefField          | 获取对应组件的实例                         | Function(name: string)，name 为表单 key 键值          |
| getFieldAttrs        | 获取对应表单组件实例属性                   | Function(name: string)                                |
| setFieldAttrs        | 重设对应表单组件属性                       | Function(name: string, fieldName: string, value: any) |
| resetVlidateFormItem | 重置表单项的验证提示                       | Function(name?: string / string[])，name 非必传       |
| scrollToFormAnchor   | 滚动到对应表单项的位置                     | Function(name: string)                                |
| validate             | 表单校验,返回一个 promise, .then()校验成功 | -                                                     |
| submit               | 表单自带校验成功提交按钮                   | -                                                     |
| cancel               | 表单自带取消按钮                           | -                                                     |

### GroupField

| 参数      | 说明           | 类型    | 可选值 | 默认值 |
| --------- | -------------- | ------- | ------ | ------ |
| groupName | 分组名         | string  | -      | -      |
| groupId   | 分组 Id        | string  | -      | -      |
| children  | 分组表单项集合 | [Field] | -      | []     |

### Field

| 参数        | 说明               | 类型    | 可选值                                                                              | 默认值   |
| ----------- | ------------------ | ------- | -------------------------------------------------------------------------------- | -------- |
| groupName   | 分组名             | string  | -                                                                                          | 不是必须 |
| groupId     | 分组 Id            | string  | -                                                                                          | 不是必须 |
| tag         | 组件类型           | string  | [text/input/radio/checkbox/cascader/uploader/number-input/date-picker/select-picker/table] | -        |
| name        | 提交表单键值 key   | string  | -                                                                                          | -        |
| label       | 输入框左侧文本     | string  | -                                                                                          | -        |
| hiddenLabel | 隐藏输入框左侧文本 | boolean | -                                                                                          | -        |
| required | 是否必填              | boolean | -                                         | false        |
| defaultValue | 初始默认值 | any | -                                                                                          | -        |
| props | 各组件其余配置参数 | Record<string, any> | -                                    |-   |
| on | 各组件自定义映射事件集合 | Record<string, any> | -                                     | -        |
| rules | 校验规则 | any[] | -                                     | -        |
| sort | 排序 | Record<string, any> | -                                     | -        |
| hidden | 隐藏本项 | Record<string, any> | -                                     | -        |
| slotName | 自定义组件插槽类名 | string | -                                     | -        |
| ifRender | 动态渲染表单控制 | Function | -                                     | -        |
| LinkageWatcher | 联动规则 |[LinkageWatcher] | -                                     | -        |

### TableFormColumn.props

| 参数    | 说明                                  | 类型 | 可选值 | 默认值 |
| ------- | ------------------------------------- | ---- | ------ | ------ |
| value   | 初始值                                | -    | -      | -      |
| options | select/checkbox/radio/cascader 数据源 | -    | -      | -      |
| 其他    | 参考对应 element 组件的属性           | -    | -      | -      |


### LinkageWatcher

| 参数    | 说明                                | 类型                                    | 可选值 | 默认值 |
| ------- | ----------------------------------- | --------------------------------------- | ------ | ------ |
| watch   | 监听的值                            | string[]                                | -      | -      |
| handler | 监听的值变化后的操作函数            | (values: any) => Promise                | -      | -      |
| options | deep: 深度监听; immediate: 立即监听 | { deep?: boolean; immediate?: boolean } | -      | -      |
