# BaseButton 按钮

## 介绍

BaseButton 是一个功能完善的按钮组件，提供了多种类型、尺寸和状态，可用于各种交互场景。支持图标、加载状态等特性。

## 基础用法

按钮组件支持 6 种类型、4 种尺寸，可以添加图标，设置圆角、禁用和加载状态。

```vue
<base-button>默认按钮</base-button>
<base-button type="primary">主要按钮</base-button>
<base-button type="success">成功按钮</base-button>
<base-button type="warning">警告按钮</base-button>
<base-button type="danger">危险按钮</base-button>
<base-button type="info">信息按钮</base-button>
```

## Props

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|----------|
| type | 按钮类型 | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'default' | 否 |
| size | 按钮尺寸 | 'large' \| 'medium' \| 'small' \| 'mini' | 'medium' | 否 |
| round | 是否圆角按钮 | boolean | false | 否 |
| disabled | 是否禁用状态 | boolean | false | 否 |
| loading | 是否加载中状态 | boolean | false | 否 |
| icon | 图标类名 | string | - | 否 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | (event: MouseEvent) |

## Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|------------|
| default | 按钮内容 | - |

## 更新日志

### v1.0.0

- 初始版本
- 实现基础按钮功能
- 支持多种类型和尺寸
- 支持图标和加载状态
- 支持禁用和圆角样式 