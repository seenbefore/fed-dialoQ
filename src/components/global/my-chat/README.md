# MyChat 聊天组件

## 介绍

MyChat 是一个基于 Vue 2.x 的聊天组件，用于创建类似AI助手的聊天界面。组件支持历史会话管理、消息发送、导出对话、设置等功能，兼容PC端和移动端。

## 特点

- 响应式设计，适配不同屏幕尺寸
- 历史会话管理（创建、删除、置顶、收藏）
- 消息功能（发送、编辑、删除、复制）
- 支持设置AI模型参数
- 支持导出聊天记录
- 支持自定义头像和欢迎消息

## 基础用法

```vue
<template>
  <div style="height: 600px; width: 100%;">
    <my-chat />
  </div>
</template>

<script>
export default {
  name: 'ChatDemo'
}
</script>
```

## 自定义配置

```vue
<template>
  <div style="height: 600px; width: 100%;">
    <my-chat 
      modelName="自定义AI模型"
      userAvatarUrl="/path/to/user-avatar.png"
      aiAvatarUrl="/path/to/ai-avatar.png"
      :welcomeMessage="welcomeMessage"
    />
  </div>
</template>

<script>
export default {
  name: 'ChatDemoCustom',
  data() {
    return {
      welcomeMessage: '您好！我是自定义AI助手，请问有什么可以帮您？'
    }
  }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelName | AI模型名称 | String | 'DeepSeek Chat' |
| userAvatarUrl | 用户头像URL | String | '' (使用默认头像) |
| aiAvatarUrl | AI头像URL | String | '' (使用默认头像) |
| welcomeMessage | 欢迎消息 | String | '您好！我是AI助手，很高兴为您服务...' |

## 文件结构

```
my-chat/
  ├── index.vue           # 主组件文件
  ├── types.ts            # 类型定义
  ├── utils.ts            # 工具函数
  └── README.md           # 组件文档
```

## 组件功能

### 历史会话管理

- 显示历史会话列表
- 创建新会话
- 删除会话
- 置顶会话
- 收藏会话

### 消息功能

- 发送消息
- 编辑消息
- 删除消息
- 复制消息内容
- 重新生成回复

### 设置功能

- 设置AI模型
- 设置温度
- 设置最大长度
- 设置上下文长度

### 导出功能

- 导出当前会话内容为TXT文件

## 集成到项目

1. 将组件复制到项目的 `src/components/global/my-chat` 目录
2. 在需要使用的页面中引入并使用：

```vue
<template>
  <div class="chat-container">
    <my-chat />
  </div>
</template>

<script>
import MyChat from '@/components/global/my-chat/index.vue'

export default {
  components: {
    MyChat
  }
}
</script>

<style scoped>
.chat-container {
  height: 100%;
  width: 100%;
}
</style>
```

## 注意事项

1. 组件需要一个具有固定高度的容器，否则可能无法正确显示
2. 在移动设备上，历史会话和设置面板会覆盖整个屏幕
3. 当前版本使用本地模拟数据，实际使用时需要替换为真实的API调用

## 版本记录

### v1.0.0

- 初始版本
- 实现基础聊天功能
- 实现历史会话管理
- 实现消息管理
- 实现设置和导出功能
- 响应式布局适配 