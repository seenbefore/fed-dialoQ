# H5移动端应用

## 路由
- 模式：默认`hash`。`settings.js`中配置`mode`。
- 页面缓存：`router.js`文件中，`meta`属性中`keepAlive`为`true`时页面缓存。

举例说明缓存开启时，有如下页面：首页A、地址列表B、地址详情C
- 从A到B，B自动刷新
- 从C回退到B，B不刷新，可使用`this.$back(false)`
- C更新了内容，返回到B需要刷新，可使用`this.$back(true)`，B页面会重新加载。

## 菜单
- 在`menu.ts`文件中可以配置菜单，菜单的`uri`属性为路由地址，`label`属性为菜单名称。方便在移动端中调试，地址`/readme/home`。
- 本地开发时，右下角会出现一个返回主页的按钮，点击按钮可以返回主页。正式发布时，会隐藏该按钮。

## 调试

### 开启调试控制台
移动端提供了两种方式开启调试控制台（eruda）：

1. URL参数方式
- 在URL后添加参数`showConsole=1`即可直接开启调试控制台
- 示例：`http://your-domain.com/path?showConsole=1`

2. 点击触发方式
- 在页面左下角有一个不可见的触发区域（40x40像素）
- 快速点击该区域10次以上可开启调试控制台
- 点击间隔超过500ms会重置计数

### 调试控制台功能
开启调试控制台后，可以使用以下功能：
- Console：查看日志输出
- Network：监控网络请求
- Elements：检查页面元素
- Resources：查看资源加载
- Sources：查看源代码
- Features：其他功能特性

## 组件说明

### AppPage 页面布局组件
移动端页面基础布局组件，提供了标准的页面结构，包含头部、内容区域和底部三个部分。路径：`/components/h5/AppPage/index.vue`

#### 组件结构
- 头部区域（header slot）：可选，用于放置页面头部内容
- 内容区域（default slot）：页面主要内容区域，支持纵向滚动
- 底部区域（footer slot）：可选，用于放置页面底部内容，如底部导航栏、按钮等

#### 样式特点
- 采用flex布局，确保页面高度100%填充
- 内容区域自动占据剩余空间并支持滚动
- 底部区域固定在底部，带有上边框分隔线
- 默认浅灰色背景(#f5f5f5)

#### 使用示例
```vue
<template>
    <app-page>
        <template #header>
            <!-- 页面头部内容 -->
        </template>
        
        <!-- 页面主要内容 -->
        <div>页面内容</div>
        
        <template #footer>
            <!-- 页面底部内容 -->
        </template>
    </app-page>
</template>
```

### TabBar 底部导航栏组件
移动端底部导航栏组件，基于Vant的Tabbar组件封装。路径：`/components/h5/TabBar/index.vue`

#### 组件属性
- `data`：导航栏数据，类型：Array，默认值：[]
  - `to`：路由地址
  - `icon`：图标名称
  - `title`：标签文本

#### 事件
- `change`：切换标签时触发，参数为当前选中标签的索引

#### 样式特点
- 固定在页面底部
- 默认高度50px
- 支持路由模式

#### 使用示例
```vue
<template>
    <tab-bar
        :data="tabBarData"
        @change="handleTabChange"
    />
</template>

<script>
export default {
    data() {
        return {
            tabBarData: [
                { to: '/home', icon: 'home-o', title: '首页' },
                { to: '/list', icon: 'list-o', title: '列表' },
                { to: '/mine', icon: 'user-o', title: '我的' }
            ]
        }
    },
    methods: {
        handleTabChange(index) {
            console.log('当前选中标签索引：', index)
        }
    }
}
</script>
```
