# my-legend-group

## 属性

### 使用案例

```html

<!-- 自定义处理百分比，number字段可以省略 -->
<my-legend-group
    class="legend-group__wrap"
    custom-rate
    :colors="colors"
    :list="legendList1"
>
</my-legend-group>

<!-- 默认由组件自动通过number值来处理百分比，number字段不可缺失 -->
<my-legend-group
    class="legend-group__wrap"
    :colors="colors"
    :list="legendList2"
>
</my-legend-group>


```

```js

const colors = ['#4983F5', '#9259F0', '#3DB9D2']

const legendList1 = [
    {
        title: '信用贷款',
        rate: '0.3811',
        rateDecimals: 2,
    },
    {
        title: '保证贷款',
        rate: '0.2813',
        rateDecimals: 2,
    },
    {
        title: '抵押贷款',
        rate: '0.2023',
        rateDecimals: 2,
    },
]

const legendList2 = [
    {
        title: '信用贷款',
        number: 25,
        unit: '户',
        rate: '0.3811',
        rateDecimals: 2,
    },
    {
        title: '保证贷款',
        number: 23,
        unit: '户',
        rate: '0.2813',
        rateDecimals: 2,
    },
    {
        title: '抵押贷款',
        number: 13,
        unit: '户',
        rate: '0.2023',
        rateDecimals: 2,
    },
]

```
