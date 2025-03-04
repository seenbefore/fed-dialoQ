# 项目说明文档

## 1. 项目概述

本项目是一个基于 Vue CLI 4 + TypeScript 搭建的后台管理系统模板，支持多个子项目入口（管理后台、H5、大屏等），提供了完整的开发框架和最佳实践。

## 2. 技术栈

- 核心框架：Vue 2.6.x
- 开发语言：TypeScript 4.1.x
- UI 框架：Element UI 2.13.2 (PC端)、Vant 2.12.x (移动端)
- 状态管理：Vuex 3.6.2
- 路由管理：Vue Router 3.4.3
- HTTP 请求：Axios 0.19.2
- 构建工具：Vue CLI 4.5.x
- 代码规范：ESLint + Prettier + StyleLint

## 3. 项目结构

```
├── core/                   # 核心功能模块
├── docs/                   # 项目文档
├── plop-templates/         # 代码生成器模板
├── src/
│   ├── @types/            # TypeScript 类型定义
│   ├── api/               # API 接口定义
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   ├── entry/             # 多入口配置
│   │   ├── admin/        # 管理后台入口
│   │   ├── h5/          # H5入口
│   │   ├── bigScreen/   # 大屏入口
│   ├── hooks/            # Vue Hooks
│   ├── layout/           # 布局组件
│   ├── router/           # 路由配置
│   ├── store/            # Vuex 状态管理
│   ├── styles/           # 全局样式
│   ├── utils/            # 工具函数
│   └── views/            # 页面组件
```

## 4. 环境配置

项目支持多环境配置：

- development：开发环境
- fat：功能验收测试环境
- uat：用户验收测试环境
- production：生产环境

环境变量配置文件：
- .env：默认配置
- .env.development：开发环境配置
- .env.fat：FAT环境配置
- .env.uat：UAT环境配置
- .env.production：生产环境配置

## 5. 开发命令

```bash
# 安装依赖
npm run start

# 运行管理后台开发环境
npm run dev

# 运行H5开发环境
npm run dev:h5-demo

# 构建生产环境
npm run build

# 代码格式检查
npm run lint

# 代码格式修复
npm run fix
```

## 6. 开发工具

### 6.1 代码生成

- `npm run new`：生成管理后台页面
- `npm run spa`：生成单页应用模板
- `npm run gen:report`：生成报表页面
- `npm run gen:form`：生成表单页面
- `npm run gen:detail`：生成详情页面

### 6.2 API生成

- `npm run api:local`：根据本地配置生成API接口文件

## 7. 项目特性

- 支持多入口构建，可同时开发PC端和移动端
- 集成代码生成器，提高开发效率
- 完整的TypeScript支持
- 规范的代码风格检查和格式化
- 灵活的环境配置
- 丰富的组件库和工具函数
- 支持多种布局方式
- 集成常用的开发工具和最佳实践

## 8. 开发规范

- 使用TypeScript进行开发
- 遵循ESLint和Prettier配置的代码规范
- 使用Vue Class Component的方式编写组件
- 遵循组件和工具函数的命名规范
- 保持良好的代码注释
- 遵循Git commit message规范

## 9. 构建部署

项目提供了多个构建命令用于不同环境：

```bash
# FAT环境构建
npm run build:fat

# UAT环境构建
npm run build:uat

# 生产环境构建
npm run build:prd
```

## 10. 其他工具

- `npm run reset`：还原代码到上个版本
- `npm run save`：保存代码到本地
- `npm run update:core`：更新核心模块
- `npm run base:init`：初始化项目
- `npm run tinypng`：图片压缩
- `npm run report`：构建分析报告

## 11. 注意事项

1. 首次使用需执行 `npm run start` 安装依赖
2. 开发前需了解项目的目录结构和开发规范
3. 使用API生成工具前需要配置 api-generator.local.js
4. 提交代码前需要执行代码检查和格式化
5. 更新核心模块时需要注意版本兼容性

