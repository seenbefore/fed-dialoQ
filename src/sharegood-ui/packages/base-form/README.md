## 表单组件 sg-base-form

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。支持灵活的布局方式和丰富的表单控件。


### 基础用法

```vue
<template>
    <div>
        <sg-base-form v-bind="getFormAttrs" @submit="handleSubmit" @reset="handleReset" />
        <el-button @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

interface FormData {
    username: string
    type: string
}

@Component({
    name: 'FormExample',
})
export default class FormExample extends Vue {
    private fields = [
        {
            columns: [
                {
                    tag: 'input',
                    name: 'username',
                    itemAttrs: {
                        label: '用户名',
                        required: true,
                    },
                    attrs: {
                        placeholder: '请输入用户名',
                    },
                },
                {
                    tag: 'select',
                    name: 'type',
                    itemAttrs: {
                        label: '类型',
                    },
                    attrs: {
                        options: [
                            { label: '选项1', value: '1' },
                            { label: '选项2', value: '2' },
                        ],
                    },
                },
            ],
        },
    ]

    private rules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    }

    get getFormAttrs() {
        return {
            fields: this.fields,
            rules: this.rules,
        }
    }

    private handleSubmit(formData: FormData) {
        console.log('提交的表单数据:', formData)
    }

    private handleReset(formData: FormData) {
        console.log('表单已重置', formData)
    }
}
</script>

```

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
| tight | 是否使用紧凑布局 | Boolean | - | false |
| size | 表单控件尺寸 | String | medium/small/mini | small |
| formClass | 表单类名 | String | inline/column | inline |
| autoLayout | 是否自动布局 | Boolean | - | true |
| columnCount | 每行显示的列数(autoLayout为false时生效) | Number | - | 3 |
| contentWidth | 内容区宽度(autoLayout为false时生效) | Number/String | - | 250 |
| gap | 列间距(autoLayout为false时生效) | Number | - | 40 |
| maxDefaultShowCount | 默认显示的最大字段数 | Number | - | 9 |
| autoAppendAction | 是否自动追加操作按钮 | Boolean | - | false |
| colon | label后是否自动添加冒号 | Boolean | - | true |
| autoTriggerSubComponentValidate | 是否自动触发子组件校验 | Boolean | - | false |

### 方法

| 事件名称     | 说明     | 回调参数  |
| ------------ | -------- | --------- |
| submit | 提交表单 |- |
| validate     | 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。|     Function(callback: Function(boolean, object))      |
| reset        | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 |           |
| getFieldProps | 获取原始配置数据 | Function(propName) |
| validateField | 对部分表单字段进行校验的方法 | Function(props: array | string, callback: Function(errorMessage: string)) |
| clearValidate | 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果 |Function(props: array | string) |
| setState | 设置表单字段值 | Function(name: string | object, value: any) |
| getState | 获取表单数据 | Function() |
| getFieldRef | 获取表单项组件实例 | Function(name: string) |
| updateSchema | 更新表单项配置 | Function(field: string, name: string, value: any) |
| getSchema | 获取表单项配置 | Function(field: string) |

### 事件

| 事件名称 | 说明     | 回调参数     |
| -------- | -------- | ------------ |
| submit   | 提交数据 | formData: 表单数据对象 |
| reset    | 数据重置 | - |
| change   | 表单数据变化 | formData: 表单数据对象 |
| register | 表单注册完成 | formInstance: 表单实例 |
| validateField | 字段校验触发 | prop: 校验的字段名 |

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
| appendSlot | 追加的插槽名称 | string | - | - |
| style | 自定义样式 | object/string | - | - |
| ifRender | 是否渲染当前行 | function | - | - |

### Column属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| tag | 表单域类型 | string | input/select/date/checkbox/autocomplete/radio/cascader/slot/action/text/range/switch/daterange/timerange/singleCheckbox/input-number | - |
| itemAttrs | form-item属性 | object | - | - |
| name | 表单字段名 | string | - | - |
| custom | 是否使用自定义的全局组件 | boolean/string | - | false |
| visible | 是否显示 | boolean | - | true |
| ifRender | 是否渲染当前列 | function | - | Function(model:当前的form-model对象) |
| span | 每列宽度 | [Function,Number] | - | Function(count:当前显示的列总数) |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push | 栅格向右移动格数 | number | — | 0 |
| pull | 栅格向左移动格数 | number | — | 0 |
| xs | `<768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | `≥768px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | `≥992px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| render | 自定义渲染函数 | function | - | - |
| formatData | 格式化表单数据 | function | - | - |
| parseData | 解析表单数据 | function | - | - |
| componentProps | 动态组件属性 | function | - | - |
| getAttrs | 获取组件属性 | function | - | - |
| slot/slotName | 插槽名称 | string | - | - |
| appendSlot | 追加的插槽名称 | string | - | - |

### Column[item].attrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| inputSlots | input组件对应插槽 [prefix, suffix,prepend,append] | array | - | - |
| autocompleteSlot | autocomplete组件模板插槽 | string | - | - |
| listeners | 组件事件集合 | object | - | - |
| onChange | 数据变化回调 | Function({name,value,option}) | - | - |
| options | select/checkbox/radio/cascader 数据源 | array | - | - |
| load | autocomplete组件获取数据函数 | function | - | - |
| isTriggerSubmit | enter时是否触发submit | boolean | - | false |
| rules | 校验规则 | array/object | - | - |
| value | 默认值 | any | - | - |
| class | 组件类名 | string | - | - |
| appendSlotRender | 追加的渲染函数 | function | - | - |

### column[item].itemAttrs属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ----- | ------- | ------ | -------- |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px'。支持 `auto`。 | string | — | — |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | — | false |
| rules | 表单验证规则 | object/array | — | — |
| error | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string | — | — |
| show-message | 是否显示校验错误信息 | boolean | — | true |
| inline-message | 以行内形式展示校验信息 | boolean | — | false |
| size | 用于控制该表单域下组件的尺寸 | string | medium/small/mini | - |
| showLabelTooltip | 文本过长时是否显示label的tip | boolean | - | false |
| helpMessage | 帮助信息 | string | - | - |
| helpIcon | 帮助图标 | string | - | - |
| labelRender | 自定义标签渲染函数 | function | - | - |
| labelSlot | 标签插槽名称 | string | - | - |
| colon | 是否显示冒号 | boolean | - | - |
| autoTriggerSubComponentValidate | 是否自动触发子组件校验 | boolean | - | - |

### 插槽

| 插槽名称 | 说明 |
| -------- | ---- |
| header | 表单头部内容 |
| footer | 表单底部内容 |
| [field]-label | 表单项标签内容 |
| [field] | 表单项内容 |

### 高级特性

1. 自动布局
```vue
<sg-base-form :auto-layout="true" :column-count="3" :content-width="250" :gap="40" />
```

2. 动态显示/隐藏
```js
{
  tag: 'input',
  name: 'field1',
  visible: false, // 初始隐藏
  ifRender(formData) { // 根据条件动态显示
    return formData.type === '1'
  }
}
```

3. 数据格式化
```js
{
  tag: 'daterange',
  name: 'dateRange',
  formatData(value, {name, formModel}) { // 提交时格式化
    return {
      startDate: value[0],
      endDate: value[1]
    }
  },
  parseData(formData, {name}) { // 初始化时解析
    return {
      dateRange: [formData.startDate, formData.endDate]
    }
  }
}
```

4. 动态属性
```js
{
  tag: 'select',
  name: 'field',
  componentProps({schema, formModel}) { // 动态设置组件属性
    return {
      attrs: {
        disabled: formModel.type === '1'
      }
    }
  }
}
```

### 最佳实践

1. 合理使用布局
- 使用 `auto-layout` 实现自适应布局
- 通过 `span` 控制表单项宽度
- 使用 `labelWidth` 统一标签宽度

2. 表单验证
- 配置必填项 `required: true`
- 使用 `rules` 定义复杂验证规则
- 调用 `validate` 方法进行表单验证

3. 数据处理
- 使用 `formatData` 在提交前格式化数据
- 使用 `parseData` 处理初始值
- 监听 `change` 事件处理数据变化

4. 性能优化
- 合理使用 `visible` 和 `ifRender`
- 避免频繁更新表单配置
- 使用 `componentProps` 而不是直接修改配置

5. 扩展性
- 使用 `custom` 支持自定义组件
- 通过插槽实现复杂的自定义内容
- 使用 `render` 函数实现动态渲染