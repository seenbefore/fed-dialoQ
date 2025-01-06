# Chart 图表组件

基于 ECharts 封装的通用图表组件，支持自定义配置和样式。

## 功能特点

- 支持所有 ECharts 配置项
- 支持自定义样式
- 支持配置合并策略
- 自动处理图表缩放
- 支持 keep-alive 组件

## 使用方法

```vue
<template>
    <Chart
        :option="chartOption"
        :default-option="defaultOption"
        :chart-style="{ height: '400px' }"
        :get-option="customMergeOption"
    />
</template>

<script>
import Chart from '@/components/Chart/index.vue'
export default {
    components: {
        Chart,
    },
    data() {
        return {
            chartOption: {
                // ECharts 配置项
                series: [{
                    type: 'line',
                    data: [1, 2, 3, 4, 5]
                }]
            },
            defaultOption: {
                // 默认配置项
                title: {
                    text: '图表标题'
                }
            }
        }
    },
    methods: {
        customMergeOption(defaultOption, option) {
            // 自定义配置合并方法
            return {
                ...defaultOption,
                ...option
            }
        }
    }
}
</script>
```

## Props 说明

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| option | ECharts 配置项 | Object | {} |
| defaultOption | 默认配置项 | Object | {} |
| chartStyle | 自定义样式 | Object | {} |
| getOption | 配置合并方法 | Function | (defaultOption, option) => ({...defaultOption, ...option}) |

## 事件

组件内部会自动监听以下情况并更新图表：

- option 属性变化时重新渲染图表
- 组件激活时（keep-alive）自动调整图表大小
- 组件挂载完成时初始化图表

## 注意事项

1. 组件默认高度为 300px，可通过 chartStyle 属性自定义
2. 配置项更新时会完全替换而不是合并，以避免 legend 等配置的冲突
3. 在 keep-alive 组件中使用时会自动处理图表大小调整

## 示例

### 基础折线图

```vue
<template>
    <sg-base-chart :option="lineOption" />
</template>

<script>
export default {
    data() {
        return {
            lineOption: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            }
        }
    }
}
</script>
```

### 自定义样式

```vue
<template>
    <sg-base-chart 
        :option="pieOption"
        :chart-style="{ height: '500px', width: '100%' }"
    />
</template>
```

## 依赖

- echarts: ^5.x.x
- vue-property-decorator: ^7.2.6 