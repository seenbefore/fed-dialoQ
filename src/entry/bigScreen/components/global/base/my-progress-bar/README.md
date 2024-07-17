# my-progress-bar

进度条组件

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| value  | 进度条数值  | Number | 0  |
| label  | 进度条说明文本  | String | -  |
| config  | 进度条配置项，参考el-progress的Attributes  | Object | -  |
| customConfig  | 自定义数值配置  | ICustomConfig | -  |

### ICustomConfig - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| show  | 是否显示  | Boolean | false  |
| style  | 数值样式  | Object | -  |

### 事件 - Events

| 事件名    |  说明   | 回调参数 |
| ------- | ------ | ------  |
| xx | xx    | xx   |

### 方法 - Methods

| 方法名    |  说明   |  参数 | 返回值 |
| ------- | ------ | ----- | ----- |
| xx | xx    |  xx  | xx |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| before |  进度条头部内容  |
| after |  进度条尾部内容  |

### 示例

+ js版本

```bash

<my-progress-bar class="is-progress" v-bind="progressData"></my-progress-bar>

const progressData = {
    customConfig: {
        show: true,
        style: {
            color: 'red',
            fontSize: '28px',
        },
    },
    config: {
        type: 'circle',
        color: '#0AE0FF',
        width: 46,
        'stroke-width': 6,
    },
    value: Math.ceil(Math.random() * 100),
    label: '环形进度条标题',
}

```

+ tsx版本

```bash

<my-progress-bar class="is-progress" props={progressData}></my-progress-bar>

const progressData = {
    config: {
        type: 'circle',
        color: '#0AE0FF',
        width: 46,
        'stroke-width': 6,
    },
    value: Math.ceil(Math.random() * 100),
    label: '环形进度条标题',
}

```
