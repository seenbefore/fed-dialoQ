## 项目介绍-项目全称

### 概要
- 技术选型: vue/react/angular/jquery/浙政钉小程序/uniapp
- 开发方式: 前后端分离/前后端不分离/浙政钉小程序
- 访问方式：浏览器(支持: IE10+、chrome)/浙政钉小程序
- 产品类型: 独立产品/组件化产品（作为第三方页面）

### 特性

* 基于`@vue/cli3`
* CSS 预编译语言：[less](http://lesscss.org/)
* 数据请求：axios
* 基于 plop 实现模板化开发
* 基于`element-ui`封装了`sharegood-ui`的 pc 端通用组件
* 支持数据 mock
* 百度地图

### 模块

* 一级模块
  - 二级模块
  - 二级模块

## 环境依赖
|   名称   | 版本  |  备注  |
| --- |--- |--- |
| node | v0.10.28+ |  |
| vue | 2.6.12 |  |
| nginx  | 1.18+ |  |
| 政务钉钉开发者工具  | - |  |


## 开发上手

### web
```bash
# 安装依赖
npm install

# 启动服务
npm run dev

# 新建业务
npm run new

# 检查包大小
npm run build --report
# 构建开发环境
npm run build:fat

# 构建测试环境
npm run build:uat

# 构建生产环境
npm run build:prd
```

浏览器访问 http://localhost:8080

> 多端：http://localhost:8080、http://localhost:8080/A、http://localhost:8080/B

### miniapp（小程序）
```bash
# 政务钉钉开发者工具
```

## 数据交互

**Request Headers**
```
token: ''
Content-Type: 'application/json'
```

> Content-Type: application/x-www-form-urlencoded or application/json


## 配置说明

### 打包配置
默认配置 **.env.development**
```
# 编译模式
NODE_ENV = development
# 开发环境
VUE_APP_ENV = dev
# 静态资源请求目录
BASE_URL = '/'
# 是否启用 mock
VUE_APP_MOCK = true
# 接口前缀
VUE_APP_BASEURL_API = ''
# 接口反向代理
DEV_PROXY_TARGET_API = ''
# 打包路径
outputDir = 'dist'
# 移动端调试
VUE_APP_ERUDA = false
```

新建本地配置 **.env.development.local**
```
# 是否启用 mock
VUE_APP_MOCK = false
# 接口前缀 http://192.168.1.17:8088
VUE_APP_BASEURL_API = ''
# 接口反向代理 http://192.168.1.17:8088
DEV_PROXY_TARGET_API = ''
```

### 环境配置
**src/config/app.js**
```javascript
// 不同环境配置
const EnvMap = {
    dev: {
        OLD_PREFFIX: '/old',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
    test: {
        OLD_PREFFIX: '',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
    prod: {
        OLD_PREFFIX: '',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
}
```

## 代码提交

### commit 格式

格式 `type: subject`

> 比如 feat: 新增登录模块

```javascript
;
[
    'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
    'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
    'feat', // Adds a new feature. 新增feature
    'fix', // Solves a bug. 修复bug
    'merge', // Merge branch ? of ?.
    'perf', // Improves performance. 优化相关，比如提升性能、体验
    'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
    'revert', // Reverts a previous commit. 回滚到上一个版本
    'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
    'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
]
```

## 工程目录

```
|-- .env.development ------------ dev 环境变量
|-- .env.development.local ------ dev 本地环境变量 (被 git 忽略，需手动新建，用来重写部分环境变量)
|-- .env.production ------------- prod 环境变量
|-- .vscode --------------------- 统一 VSCode 插件及配置
|-- public
|   |-- favicon.ico
|   |-- index.html
|-- src
    |-- main.js ------------- 入门文件
    |-- App.vue 
    |-- styles
    |   |-- global.less
    |-- router ------------- 路由文件
    |   |-- index.js
    |   |-- routes.js
    |   |-- registerInterceptor.js
    |-- store ------------- 状态管理
    |   |-- index.js
    |   |-- root.js
    |   |-- xxx.js
    |-- api  ------------- 接口地址
    |   |-- xxx.js
    |-- views ------------- 页面模块
```



## 发布部署

|   环境   | 分支  |  访问地址  |  构建命令  |  发布部署  | 备注  |
| --- |--- |--- |--- |--- |--- |
| 测试环境 | develop | http://192.168.1.17:8088/ | `npm run build:uat` | [jenkins地址](http://192.168.1.148:8080/view/%E5%98%89%E5%85%B4%E6%B5%B7%E5%AE%81%E5%89%8D%E7%AB%AF%E6%9C%8D%E5%8A%A1%EF%BC%88%E6%B5%8B%E8%AF%95%EF%BC%89/) | 账号：admin123/123456 |
| 生产环境 | master | - | - | - |- |

### 运维

**打包** 

```
# 测试环境：dev分支
git clone -b dev git@gitlab.icinfo.co:credit-fe/fed-data-quality.git
# 依赖安装
npm install
# 测试环境
npm run build:uat
or
# 生产环境：master分支
git clone git@gitlab.icinfo.co:credit-fe/fed-data-quality.git
# 依赖安装
npm install
# 生产环境
npm run build:prd
```

输出文件夹 `fed-data-quality-dist`

**nginx**

```
server {
    # 运维配置
    listen       4800;
    

    location /fed-data-quality {
        # 运维配置
        alias  /opt/fed-data-quality-dist;
        index  index.html;
        # 运维配置
        try_files $uri $uri/ /fed-data-quality/index.html;
        
        # 首页禁止缓存
        if ($request_filename ~ .*\.(htm|html)$) {
            add_header Cache-Control "no-cache,no-store";
        } 
        # 静态资源默认缓存14天
        if ($request_filename ~ .*\.(js|css|png|jpg)$) {
            expires 336h;
        } 
    }
}

```

## 更多资料

### 文档
- [接口文档]()
- [产品地址]()
- [UI地址]()
- [钉钉开发文档](https://openplatform-portal.dg-work.cn/portal/#/helpdoc?docKey=kfzn&slug=ikw12b)

### 作者列表
- 前端：马金慧
- 后端：马金慧
- 产品：马金慧
- 设计：马金慧
- 交付经理：马金慧




