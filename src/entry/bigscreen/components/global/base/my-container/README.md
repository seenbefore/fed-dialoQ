# 基础容器组件

my-container

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| width  | 宽度   |  String     | -  |
| height  | 高度   |  String     | - |
| left  | left定位值   |  String     | -  |
| right  | right定位值   |  String     | - |
| top  | top定位值   |  String     | -     |
| bottom  | bottom定位值   |  String     | - |
| backgroundSrc  | 背景图片src   |  String     | - |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| default |  内容区 |

### 示例

```html

<my-container v-bind="layoutConfig"></my-container>

```

```js

const layoutConfig = { width: 500, left: 50, top: 144 }

```
