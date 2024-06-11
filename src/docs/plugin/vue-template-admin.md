## 简介
`vue-template-admin` 是一个免费开源的中后台模版。使用了`vue2`,`TypeScript`等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。


### 特性

- 基于vue2+typescript
- 代码规范
- API请求封装
- API生成器
- 基于plop的命令式路由配置
- 支持第三方嵌套
- 支持多应用打包
- 支持多环境
- 基于element的公共组件
- 内置Mock方案

### 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vuex](https://v3.vuex.vuejs.org/zh/) - 熟悉 vuex 状态管理
- [Vue2](https://v2.cn.vuejs.org/index.html) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [element-ui](https://element.eleme.cn/#/zh-CN) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法


### 安装使用

- 获取项目代码

```bash
# 系统设置提交时转换为LF，检出时不转换
git config --global core.autocrlf input
# 下载
git clone git@gitlab.icinfo.co:fed/vue-template-admin.git
```

- 安装依赖

```bash
cd vue-template-admin

npm install

```

- 运行

```bash
npm run dev
```

- 打包

```bash
npm run build
```

### 如何贡献

非常欢迎你的加入！[提一个 Issue](http://gitlab.icinfo.co/fed/vue-template-admin/-/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

### Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等



### 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

### 主要的库

|   名称   | 版本  |  备注  |
| --- |--- |--- |
| vue | 2.6.12 |  |
| vue-router | 3.4.3  |  |
| vuex | 3.6.2  |  |
| typescript | 4.1.5   |  |
| axios | 0.19.2    |  |
| element-ui | 2.13.2    | [文档](https://element.eleme.io/#/zh-CN/component/installation) |
| quill | 1.3.7   |  |
| echarts | 5.3.2    |  |



### 工程目录结构

```
|-- .env.development ------------ dev 环境变量
|-- .env.development.local ------ dev 本地环境变量 (被 git 忽略，需手动新建，用来重写部分环境变量)
|-- .env.production ------------- prod 环境变量
|-- .vscode --------------------- 统一 VSCode 配置
|-- public
|   |-- favicon.ico
|   |-- index.html
|   |-- libs -------------------- 不支持模块化加载的第三方 ES5 类库/模块 (只能通过全局变量引用)
|-- src
    |-- libs -------------------- 支持模块化加载但是无法通过 npm 安装的第三方 ES5 类库/模块
    |-- assets
    |-- styles
    |   |-- global.less
    |   |-- admin.less
    |   |-- app.less ----------- 项目自定义样式
    |   |-- index.less
    |-- entry -------------------- 多项目入口
    |   |-- subapp-h5 ----- 移动端
    |   |-- subapp-homesite ----- 官网
    |-- injects ----------------- vue 全局注册 (慎用)
    |   |-- index.js
    |   |-- $xxx.js
    |   |-- v-xxx.js
    |   |-- mixin-xxx.js
    |   |-- xxx.js
    |-- element-ui
    |   |-- index.js
    |   |-- rewrite ------------- 主题样式复写
    |       |-- index.less
    |       |-- xxx.less
    |-- vant
    |   |-- index.js
    |   |-- vars.less ----------- 内置变量复写
    |   |-- rewrite ------------- 主题样式复写
    |       |-- index.less
    |       |-- xxx.less
    |-- components
    |   |-- TheXxx.vue ---------- 单例组件
    |   |-- ExXxx.vue ----------- 扩展/包装第三方开源组件或内部公共库组件
    |   |-- XxxXxx.vue
    |   |-- ComponentExamples --- 非单例公共组件需要在这里写示例
    |   |   |-- index.vue
    |   |   |-- XxxXxx.vue
    |   |-- SvgIcon ------------- svg-sprite 图标组件
    |   |   |-- index.vue
    |   |   |-- icons
    |   |-- directives ---------- 可复用的自定义指令（局部注册）
    |   |   |-- xxx.js
    |   |-- mixins -------------- 可复用的混入（局部注册）
    |       |-- xxx.js
```


## 项目配置项

### 环境变量配置
项目的环境变量配置位于项目根目录下的 `.env`、`.env.development`、`.env.production`

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

```


#### 配置项说明
```
#
# 编译时可用的：process.env.*
# 运行时可用的：process.env.NODE_ENV、process.env.BASE_URL、process.env.VUE_APP_*
#
# BASE_URL 需要尾斜杠，接口前缀不需要尾斜杠
# BASE_URL 可以为空，详情：https://cli.vuejs.org/zh/config/#publicpath
#

# 编译模式
NODE_ENV = development
# 开发环境
VUE_APP_ENV = dev
# 静态资源请求目录
BASE_URL = '/'
# 接口前缀
VUE_APP_BASEURL_API = 'http://192.168.1.147:3000/api'
# 是否启用 mock
VUE_APP_MOCK = true
# 是否启用 调试
VUE_APP_DEBUG = false
# css 源码映射
DEV_CSS_SOURCEMAP = false
# css 自动加前缀 (进行兼容性调试时再启用)
DEV_CSS_AUTOPREFIXER = false
# 接口代理
DEV_PROXY_TARGET_API = ''
# 打包路径
outputDir = 'dist'
# 移动端调试
VUE_APP_ERUDA = ''
```

### 项目配置

#### 配置文件路径
`src/settings.js`

#### 说明
```javascript
module.exports = {
    // 路由模式 history hash
    mode: 'history',
    // 项目标识 用于vuex 本地存储
    key: 'vue-template-admin',
    // index.html SEO title
    title: '前端小书房',
    // index.html SEO keywords
    keywords: '',
    // index.html SEO description
    description: '前端小书房',
    filename: 'index.html',
    // 打包模板
    template: 'public/index.html',
    // store/settings.ts配合使用
    settings: {
        // 是否使用面包屑
        breadcrumb: false,
        // 内容区是否作为第三方页面 隐藏头部和左侧菜单
        isThirdParty: false, 
        // 后台标题 选用
        title: '前端小书房',
        // 是否使用标签页
        tagsView: true,
        // 后台板式 两种 layout-vertical layout-common
        layout: 'layout-common', 
        // 选定主题 theme-light
        theme: '',
    },
}
```

## 路由
项目路由配置存放于 `src/router/index.ts` 下面。 `src/views`在该目录下文件会自动注册。

### 配置

#### 模块说明
`src/views`内的`router.js`文件会被视为一个路由模块

一个路由模块包含以下结构

```javascript
const App404 = () => import(/* webpackChunkName: "App404" */ './index')
export default {
    path: '/404',
    name: 'App404',
    component: App404,
    meta: {
        // body class
        bodyClass: '',
        // 父级路由
        parent: '',
        // 页面标题
        title: '404',
        // 是否需要鉴权
        requireAuth: false,
        // 是否缓存页面
        keepAlive: false,
        // 高亮左侧菜单 值为菜单path
        activeMenu: ''
    },
}

```

#### 多级路由
父
```javascript
const component = () => import(/* webpackChunkName: "IndexPage" */ './_layout')

export default {
    path: '/',
    name: 'Index',
    component,
    // 默认跳转地址
    redirect: '/',
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
    },
}
```

子
```javascript
const component = () => import(/* webpackChunkName: "IndexA" */ './index')

export default {
    path: '/',
    name: 'IndexA',
    component,
    meta: {
        bodyClass: '',
        // 父name
        parent: 'Index',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
    },
}
```


### 新增路由

```
npm run new
```

## 菜单
项目菜单配置存放于 `src/menus.ts` 下面

### 菜单项类型
```javascript
export declare interface UserMenu {
    // 菜单路径
    uri?: string
    // 菜单名
    label: string
    // 菜单图标 `el-icon-date`饿了么图标、`iconfont iconchaxun`iconfont图标、`mt-example4` svg-icon
    icon?: string
    children?: UserMenu[]
}
```

## 常用组件

### tagsView-后台标签页

配置是否启动**settings.js**
```javascript
module.exports = {
    settings: {
        // 是否使用标签页
        tagsView: true,
    },
}
```
页面是否缓存 **router.js**
```javascript
export default {
    path: '/detail',
    // name必不可少
    name: 'Detail',
    meta: {
        // true 缓存
        keepAlive: true,
    }
}
```

默认名称为路由`meta.title` 需要修改标签页名称时加query参数`_`
```javascript
this.$rouer.push({
    path:'/detail',
    query:{
        _:'新标题xxx'
    }
})
```


### SvgIcon-图标组件
- 图标集中放置在 **@/components/SvgIcon/icons/** 目录里
- 单色模式(非'mt-'前缀)，大小继承至 font-size，颜色继承至 color
- 多色模式('mt-'前缀)，大小继承至 font-size，颜色则原始显示
- 建议：不要用中文命名，在一些项目下可能无法访问

`home.svg`
```html
<svg-icon icon='home' />
```

## 联调&Mock

### 开发环境
复制**.env.development**，新建**.env.development.local**

如果前端应用和后端接口服务器没有运行在同一个主机上，你需要在开发环境下将接口请求代理到接口服务器。
**.env.development.local**
```
# 代理接口
DEV_PROXY_TARGET_API = 'http://192.168.1.147:3000/api'
```

如果是同一个主机，可以直接请求具体的接口地址。(如果后端支持跨域亦可)
**.env.development.local**
```
# 接口前缀
VUE_APP_BASEURL_API = 'http://192.168.1.147:3000/api'
```

### 接口请求


**src/scripts/http/index.ts**
```javascript
import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exApiHooks from './exApiHooks'
import exAuth from './exAuth'
import exData from './exData'

const http = createAxios(
    {
        // withCredentials: true,
        // crossDomain: true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        timeout: 30 * 1000, // 默认超时30s
        baseURL: process.env.VUE_APP_BASEURL_API,
        // 业务请求是否成功
        isResponseSuccess(res: ExApiResponse) {
            if (res.code == undefined || res.code === 0 || res.code === 200) {
                return true
            }
            return false
        },
        getResponseSuccess(res: ExApiResponse) {
            return res
        },
        getResponseError(res: any) {
            const { message = '网络走神了', code = '-1' } = res
            return {
                message,
                code,
            }
        },
    },
    (instance: ExAxiosInstance) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exAuth)
        instance.exHooks.add(exApiHooks)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)
export { http }
export default http

```

#### 多个接口地址
当项目中需要用到多个接口地址时, 可以在 **src/scripts/http/index.ts** 导出多个 axios 实例
```javascript
// 目前只导出一个默认实例，接口地址对应的是环境变量中的 VITE_GLOB_API_URL 接口地址
export const http = createAxios();

// 需要有其他接口地址的可以在后面添加

// other api url
export const otherHttp = createAxios();
```

### Mock 服务
Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发进程所阻塞。

本项目使用 **Mockjs** 来进行 mock 数据处理。

#### 启动mock
**.env.development.local**

```
# 是否启用 mock
VUE_APP_MOCK = true
```

#### 本地 Mock

json模式
**src/mock/data** 文件路径就是请求地址
比如请求`/user/login` 对应创建`src/mock/data/user/login.json`

```json
{
  "code": 200,
  "message": "message",
  "data": {
    "realName": "data_realName",
    "loginType": "data_loginType",
    "username": "data_username",
    "token": "data_token"
  },
  "errors": [
    {
      "field": "errors_0_field",
      "info": "errors_0_info"
    },
    {
      "field": "errors_1_field",
      "info": "errors_1_info"
    },
    {
      "field": "errors_2_field",
      "info": "errors_2_info"
    }
  ]
}
```

js模式
可以在**src/mock/modules/mock**下新增一个文件，比如`login.js`

```javascript
import { mock } from 'mockjs'
export default [
    {
        name: '/user/login',
        method: 'post',
        description: '用户登录',
        onMock(opt, query, body) {
            const { username, password } = body
            if (!username || !password) {
                return mock({
                    code: -1,
                    message: '账号或者密码有误',
                })
            }
            return mock({
                code: 200,
                data: {
                    username,
                    token: '123456',
                    updateTime: '@date("yyyy-MM-dd")',
                    realName: '@name',
                    lastLoginTime: '@date("yyyy-MM-dd")',
                    mobilePhone: '@string(number,11)',
                    createTime: '@date("yyyy-MM-dd")',
                },
                message: '请求提示',
            })
        },
    },
]

```

### 配置权限菜单

|   名称   | 备注 |
| --- |--- |
| icon | `el-icon-date`饿了么图标、`iconfont iconchaxun`iconfont图标、`mt-example4` SvgIcon组件图标 |
| label | 菜单标题 |
| uri | 访问路由 |

⚠️ **接口获取的菜单格式也保持如下格式**

**menus.js**
```javascript
[
    {
        label: '首页',
        uri: '/dashboard',
        icon: 'el-icon-date',
    },
    {
        label: '组件使用案例',
        icon: 'el-icon-date',
        children: [
            {
                uri: 'http://www.baidu.com/s?wd=微服务',
                label: '外部地址',
            },
            {
                label: '表格',
                children: [
                    {
                        uri: '/crud/index',
                        label: '基本查询',
                    },
                ],
            },
            
        ],
    },
]
```


## 主题

默认使用 less 作为预处理语言，建议在使用前或者遇到疑问时学习一下 Less 的相关特性

项目中使用的通用样式，都存放于 **src/styles/** 下面

```
├── admin.less # 后台样式
├── app.less # 自定义样式
├── global.less # 全局样式
├── index.less # 入口
├── markdown.less # 文档相关
└── vars # 变量
```

### 全局配置
```css
:root {
    // 主题色
    --system-primary-color: #188dfb; // 可做背景色和文本色，用做背景色时，需要和--system-primary-text-color配合使用，避免文件颜色和主题色冲突
    --system-primary-text-color: #fff; // 主题色作为背景色时使用
    --system-default-color: #333;
    --system-error-color: #f5222d;
    --system-success-color: #52c41a;
    --system-warning-color: #faad14;
    --system-info-color: #bdbdbd;

    // logo颜色相关
    --system-logo-color: #f1f1f1;
    --system-logo-background: #263445;

    // 菜单颜色相关
    --system-menu-width: 200px;
    --system-menu-text-color: #333;
    --system-menu-background: #fff;
    --system-menu-children-background: #f5f5f5;
    --system-menu-submenu-active-color: #188dfb;
    --system-menu-hover-background: transparent;
    --system-menu-height: 45px;

    // header区域
    --system-header-height: 50px;
    --system-header-background: #0071f6;
    --system-header-text-color: #fff;
    --system-header-breadcrumb-text-color: #97a8be;
    --system-header-item-hover-color: #000;
    --system-header-border-color: #d8dce5;
    --system-header-tab-background: #fff;

    // contaier区域，父框架
    --system-container-background: #eee;
    --system-container-main-background: #fff;

    // 页面区域, 这一块是你在自己写的文件中使用主题，核心需要关注的地方
    --system-page-background: #fff; // 主背景
    --system-page-color: #333; // 主要的文本颜色
    --system-page-tip-color: rgba(0, 0, 0, 0.45); // 协助展示的文本颜色
    --system-page-border-color: #000; // 通用的边框配置色，便于主题扩展

    //新增系统边框颜色
    --system-border-color: #e9e9e9;

    // element主题色修改
    --el-color-primary: var(--system-primary-color);
    --el-text-active: var(--system-primary-color);

    //form表单相关颜色
    --el-form-button-active: #418bfc;
    --el-form-button-primary: var(--system-menu-background);
    --el-form-input-outline-color-hover: #40a9ff;
    --el-form-input-outline-color: rgb(96, 98, 102);

    //table相关颜色
    --el-table-head-background: var(--system-container-background);
    --el-table-text-active: var(--system-menu-submenu-active-color);
    --el-table-head-text-color: var(--system-page-color);

    //分页器相关颜色
    --el-Pagination-active-background: var(--system-menu-submenu-active-color);
    --el-pagination-default-background: var(--system-container-main-background);
}
```

### 组件样式
覆盖第三方组件请使用`::v-deep`

```css
.scroll-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    ::v-deep {
        .el-scrollbar__bar {
            bottom: 0px;
        }
    }
}
```

