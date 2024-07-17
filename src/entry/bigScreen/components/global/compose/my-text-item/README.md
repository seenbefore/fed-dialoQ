# my-text-item

文本 + 数字(数字具有滚动效果) + 单位

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| layout  | 布局，默认水平布局   | 'column/row'     | 'row'     |
| flexType  | 弹性合布局类型   | 'start/center/end'     | 'start'     |
| item  | 配置项   | TextItem    |  -    |
| fontSize  | 数字字体大小   | String    |  '30px'    |
| color  | 数字颜色   | String    |  '#00FFFF'   |
| numberStyle  | 数字其它样式   | Object    |  -   |
| resData  | 接口返回的数据对象   | Object    |  -   |

### TextItem - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
|  title |  标题  | String     | -     |
|  number |  数值  | String/Number     | -     |
|  unit |  单位  | String     | -     |
|  decimals |  保留小数位  | String/Number     | -     |
|  key |  数值对应的key名  | String     | -     |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| before |  组件头部内容  |
| after | 组件尾部内容   |

### 示例

```html

<my-text-item class="item" font-size="28px" layout="column" color="#0AE0FF" :res-data="resData" :item="item" />

```

```js

const item = {
    title: '标题',
    number: 123,
    decimals: 0,
    unit: '个',
    key: 'key1'
}

const resData = {
    key1: '99'
}

```
