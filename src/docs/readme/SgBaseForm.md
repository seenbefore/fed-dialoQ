
## 动态表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据


### 基础属性

| 参数          | 说明            | 类型             | 可选值 | 默认值 |
| ------------- | --------------- | ---------------- | ------ | ------ |
| fields        | 表单数据`Array<Row:Array<Column>>`       | Array            | —      | -      |
| rules         | 表单校验规则，参考element       | Object           | —      | -      |
| labelWidth    | 全局 label 宽度 | [Number, String] | —      | 120px  |
| type          | 布局模式，可选 flex，现代浏览器下有效        | String           | —      | flex   |
| span          | 每列宽度        | [Number, String] | [1, 24] | 8      |
| gutter          | 栅格间隔        | Number |  | 0      |
| justify       | flex 布局下的水平排列方式       | String           |  start/end/center/space-around/space-between     | start     |
| onSubmitText | 提交文案      | String          | —      | 提交   |
| resetText | 重置文案      | String          | —      | 重置   |
| moreText | 展开文案      | String          | —      | 展开条件   |
| hiddenText | 收起文案      | String          | —      | 收起条件   |
| labelPosition | label位置      | String          | left/right/top      | right   |



### 方法

| 事件名称     | 说明     | 回调参数  |
| ------------ | -------- | --------- |
| submit | 提交表单 |- |
| validate     | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。|     Function(callback: Function(boolean, object))      |
| reset        | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 |           |
| getFieldProps | 获取原始配置数据 | Function(propName) |
| validateField | 对部分表单字段进行校验的方法 | Function(props: array | string, callback: Function(errorMessage: string)) |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 |Function(props: array | string) |

### 事件

| 事件名称 | 说明     | 回调参数     |
| -------- | -------- | ------------ |
| submit   | 提交数据 |              |
| reset    | 数据重置 |              |


### Row属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | top |
| tag | 自定义元素标签 | string | * | div |
| class | row的class | string | - | - |
| columns | `Array<Column>` |  Array  |  -  |  -  |

### Column

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| tag |    |  表单域  |  string  | input / select / date / checkbox / autocomplete / radio / cascader / slot / action  |
| itemAttrs  | form-item属性  |  object  |   |    |
| name  | 表单 key   |  string   |  |     |
| custom  |是否使用自定义的全局组件   |  boolean   |  |     |
| visible | 是否显示 | boolean   |    | true |
| ifRender | 是否渲染当前列 |  function  |  -  |  Function(model:当前的form-model对象)  |
| span | 每列宽度 |  [Function,Number]  |  -  |  Function(count:当前显示的列总数)  |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |

### Column[item].attrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| inputSlots | input组件对应插槽 [prefix, suffix,prepend,append] |     |    |     |
| autocompleteSlot  | autocomplete组件模板插槽  |     |   |      |
| listeners  | 组件事件集合   |     |  |        |
| onChange | 数据变化        | Function({name,value,option})    |    |           |
| options | select/checkbox/radio/cascader 数据源 |             |    |       |
| load | autocomplete组件获取数据函数 |             |    |       |
| isTriggerSubmit | enter的时候是否触发submit |             |    |       |
| rules | 校验规则 |             |    |       |
| 其他 | 参考对应element组件的属性 |             |    |       |

### column[item].itemAttrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string |       —       | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| error    | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message  | 是否显示校验错误信息 | boolean | — | true |
| inline-message  | 以行内形式展示校验信息 | boolean | — | false |
| size  | 用于控制该表单域下组件的尺寸 | string | medium / small / mini | - |
| showLabelTooltip | 文本过长时是否显示label的tip | boolean  |  -  |   false    |