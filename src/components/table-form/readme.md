## 可编辑表格

### 基础属性

| 参数             | 说明                     | 类型                                  | 可选值         | 默认值 |
| ---------------- | ------------------------ | ------------------------------------- | -------------- | ------ |
| value / v-model  | 绑定值                   | object                                | —              | -      |
| fields           | 列配置                   | [TableFormColumn](#tableformcolumn)[] | -              | -      |
| operaType        | 操作类型                 | string                                | edit, readonly | edit   |
| footAddBtnText   | 底部新增按钮名           | string                                | —              | -      |
| footAddBtnHandle | 底部新增按钮事件         | Function                              | —              |        |
| themeStyle       | 主题样式                 | string                                | single-table   | -      |
| defaultValue     | 只读状态下，空值的默认值 | string                                | —              | -      |

### 方法

| 方法名称   | 说明                                                                                           | 参数                                  |
| ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| validate   | 校验整个表单，返回一个 promise<{ valid, result }>。valid-是否校验成功，result-未通过校验的字段 | -                                     |
| reset      | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                     | -                                     |
| appendData | 追加数据, 如果不传入追加的值，则取默认值                                                       | Function(value?: Record<string, any>) |
| deleteData | 移除指定行的数据                                                                               | Function(index: number)               |

### TableFormColumn

| 参数              | 说明                                                                                            | 类型                              | 可选值                                                             | 默认值 |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------ | ------ |
| tag               | 表单控件                                                                                        | FormFieldTag                      | input / select / date / checkbox / autocomplete / radio / cascader | -      |
| prop              | 对应列内容的字段名                                                                              | string                            | -                                                                  | -      |
| label             | 表头名                                                                                          | string                            | -                                                                  | -      |
| width             | 对应列的宽度                                                                                    | string                            | -                                                                  | -      |
| minWidth          | 对应列的最小宽度，会把剩余宽度按比例分配给设置了 minWidth 的列                                  | string                            | -                                                                  | -      |
| align             | 对齐方式                                                                                        | string                            | left, center, right                                                | -      |
| headerColspan     | 表头要合并的单元格数(横向合并)                                                                  | number                            | -                                                                  | -      |
| headerRender      | 表头内容渲染函数 Function(h: CreateElement, column: {row: any})                                 | Function                          | -                                                                  | -      |
| render            | 只读模式渲染内容 Function(h: CreateElement, column: {row: any})                                 | Function                          | -                                                                  | -      |
| ifRender          | 是否渲染列                                                                                      | ()=>boolean                       | -                                                                  | -      |
| withReadonlyModel | 自定义组件是否具有只读模式(为 false 时，则使用表单组件内置的只读模式，否则有自定以组件自己控制) | boolean                           | -                                                                  | false  |
| linkageRule       | 联动规则监听器                                                                                  | [LinkageWatcher](#linkagewatcher) | -                                                                  | -      |

### TableFormColumn.attrs

| 参数    | 说明                                  | 类型 | 可选值 | 默认值 |
| ------- | ------------------------------------- | ---- | ------ | ------ |
| value   | 初始值                                | -    | -      | -      |
| options | select/checkbox/radio/cascader 数据源 | -    | -      | -      |
| 其他    | 参考对应 element 组件的属性           | -    | -      | -      |

### TableFormColumn.itemAttrs

| 参数  | 说明             | 类型 | 可选值 | 默认值 |
| ----- | ---------------- | ---- | ------ | ------ |
| label | 单元格内表单标题 | -    | -      | -      |
| rules | 校验规则         | -    | -      | -      |

### LinkageWatcher

| 参数    | 说明                                | 类型                                    | 可选值 | 默认值 |
| ------- | ----------------------------------- | --------------------------------------- | ------ | ------ |
| watch   | 监听的值                            | string[]                                | -      | -      |
| handler | 监听的值变化后的操作函数            | (values: any) => Promise                | -      | -      |
| options | deep: 深度监听; immediate: 立即监听 | { deep?: boolean; immediate?: boolean } | -      | -      |
