# El-Skeleton 骨架屏组件

一个用于在内容加载过程中展示的骨架屏组件，提供更好的用户体验。

## 基础用法

```vue
<template>
    <el-skeleton :rows="3" animated />
</template>
```

## 带头像的骨架屏

```vue
<template>
    <el-skeleton 
        :rows="3" 
        avatar 
        animated 
        avatar-size="40px"
        avatar-shape="circle"
    />
</template>
```

## 带标题的骨架屏

```vue
<template>
    <el-skeleton 
        :rows="3" 
        title 
        animated 
        title-width="200px"
    />
</template>
```

## 完整示例

```vue
<template>
    <el-skeleton 
        :rows="3" 
        title 
        avatar 
        animated 
        title-width="200px"
        avatar-size="40px"
        avatar-shape="circle"
        row-height="20px"
    />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| animated | 是否显示动画效果 | boolean | false |
| title | 是否显示标题占位图 | boolean | false |
| titleWidth | 标题占位图宽度 | string | '40%' |
| avatar | 是否显示头像占位图 | boolean | false |
| avatarSize | 头像占位图大小 | string | '32px' |
| avatarShape | 头像形状，可选值：circle/square | string | 'circle' |
| rows | 段落占位图行数 | number | 3 |
| rowHeight | 段落占位图行高 | string | '16px' |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容 | 