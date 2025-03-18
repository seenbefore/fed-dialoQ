# ElEmpty 空状态组件

## 介绍

`el-empty` 是一个基于 Element UI 的空状态组件，用于展示空数据状态。它提供了一个优雅的方式来展示没有数据时的界面，并且支持多种自定义选项。`全局组件`

## 功能特点

- 使用 SVG 图标作为默认空状态图标，确保清晰度和可扩展性
- 支持自定义图片，可以替换默认的 SVG 图标
- 支持自定义图标大小，适应不同的展示场景
- 支持自定义描述文字，提供更灵活的提示信息
- 支持自定义底部内容，可以添加操作按钮等
- 完全兼容 Element UI 的设计风格，保持视觉统一性

## 使用示例

### 基础用法

```vue
<el-empty description="暂无数据"></el-empty>
```

### 自定义图片

```vue
<el-empty 
  image="path/to/image.png" 
  description="暂无数据">
</el-empty>
```

### 自定义图标大小

```vue
<el-empty 
  :image-size="300" 
  description="暂无数据">
</el-empty>
```

### 自定义底部内容

```vue
<el-empty description="暂无数据">
  <el-button type="primary">创建数据</el-button>
</el-empty>
```

## 组件属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| description | 描述文字 | string | - | '暂无数据' |
| image | 自定义图片地址 | string | - | - |
| imageSize | 图标大小 | number | - | 200 |

## 插槽

| 名称 | 说明 |
|------|------|
| default | 自定义底部内容 |

## 最佳实践

1. 在列表为空时使用：
```vue
<template>
  <div>
    <el-table v-if="data.length > 0" :data="data">
      <!-- 表格内容 -->
    </el-table>
    <el-empty v-else description="暂无数据"></el-empty>
  </div>
</template>
```

2. 在搜索无结果时使用：
```vue
<template>
  <div>
    <el-empty 
      description="未找到匹配的结果"
      :image-size="200">
      <el-button type="primary" @click="resetSearch">
        重置搜索条件
      </el-button>
    </el-empty>
  </div>
</template>
```

3. 在加载失败时使用：
```vue
<template>
  <div>
    <el-empty 
      description="加载失败，请稍后重试"
      image="error.png">
      <el-button type="primary" @click="retry">
        重试
      </el-button>
    </el-empty>
  </div>
</template>
```

## 注意事项

1. 当使用自定义图片时，建议使用适当大小的图片，过大的图片可能会影响加载性能
2. 描述文字应该简洁明了，避免过长
3. 底部内容应该与空状态场景相关，提供有意义的操作选项
4. 图标大小应该根据实际使用场景调整，过大会显得突兀，过小则不够醒目

## 更新日志

### 1.0.0
- 初始版本发布
- 支持基础的空状态展示
- 支持自定义图片和描述文字
- 支持自定义底部内容 