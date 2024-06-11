# 温岭农商行

### 介绍 📖
前后端分离的后台管理框架，页面内嵌在温岭农商项目中。

#### 主要功能
- 我的工作台
    - 我的待办
    - 我的已办
- 营销中心
    - 信用查询
    - 企业标签管理
    - 授权管理
    - 征信授权管理
- 信贷中心
    - 模型配置
    - 审批配置
- 系统设置
### 技术栈&工具 🔥

- Vue2、TypeScript、Vuex、Element
- node：版本推荐`14.17.0`
- vscode：代码编辑器


### 在线预览 👀

- 项目测试地址：http://192.168.1.175:8988/
- 前端测试地址：http://192.168.1.147:9110/


### 安装使用步骤 📔

- **Clone：**

```bash
# 下载代码前设置下git（系统设置提交时转换为LF，检出时不转换 ）
git config --global core.autocrlf input
# 下载代码
git clone git@gitlab.icinfo.co:fed/fed-wenling.git
```

- **Install：**

```bash
npm install
```

- **Run：**

```bash
# 基于.env.development-third 复制一份.env.development-third.local
npm run dev
```

- **Build：**

```bash
# 测试环境
npm build:uat

# 生产环境
npm build:prd
```

- **Lint：**

```bash
# eslint 格式化代码
npm run fix
```

- **commit：**

```bash
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
git add .
git commit -m 'feat: 新增xx功能'
```


- **code generation：**

```bash
# 基于`plop`自动生成页面和路由
npm run new
```


```bash
# 生成接口到services目录
npm run api

# 生成接口（为避免文件冲突， 可以从api-generator.js复制一份新的api-generator.local.js）
npm run api:local
```

### 开发准备


- 点击管理员-`去JSP登录` 登录项目
    - [http://192.168.1.175:8988](http://192.168.1.175:8988)
- 点击管理员-`去获取hnxw_ssid`
- url会重新跳转显示新地址，拿到接口鉴权所需的`hnxw_ssid`
    - [http://192.168.1.147:9110/credit/ceo-query?timestamp_v=1695296952785-1716779765&hnxw_ssid=5b9608b1-ba02-4f23-9020-e6eefec49b4b](http://192.168.1.147:9110/credit/ceo-query?timestamp_v=1695296952785-1716779765&hnxw_ssid=5b9608b1-ba02-4f23-9020-e6eefec49b4b)，
- 本地服务启动后重新访问地址 
    - http://localhost:8080/credit/ceo-query?hnxw_ssid=5b9608b1-ba02-4f23-9020-e6eefec49b4b

- 页面完成后去线上将前端路由地址配置成对应的菜单（系统设置-权限管理），
### 项目截图 📷

- 线上-登录：

![t2f1ME](http://cdn.qiniu.barebear.cn/uPic/t2f1ME.png)

- 线上-董监高查询：

![aJKjAr](http://cdn.qiniu.barebear.cn/uPic/aJKjAr.png)


- 本地开发：

![ScI9zl](http://cdn.qiniu.barebear.cn/uPic/ScI9zl.png)




### 文件资源目录 📚

```text

├─ .vscode                # VSCode 推荐配置
├─ build                  # 打包配置项
├─ public                 # 静态资源文件（该文件夹不会被打包）
│  ├─ index.html          # 入口 html
│  ├─ static    
│  │  ├─ assets                     # 静态资源文件（绝对路径下的，不会被编译）
├─ src
│  ├─ entry         
│  │  ├─ assets                     # 静态资源文件（相对路径下的，会被编译）
│  │  ├─ components                 # 组件
│  │  ├─ config                     # 全局配置项
│  │  ├─ dict                       # 全局字典
│  │  ├─ router                     # 路由管理
│  │  ├─ scripts                    # http实例等
│  │  ├─ service                    # 所有接口
│  │  ├─ store                      # 状态管理
│  │  ├─ styles                     # 全局样式文件
│  │  ├─ views                      # 项目所有页面
│  │  ├─ App.vue                    # 项目主组件
│  │  ├─ .env.development-third     # 开发环境配置
│  │  ├─ .env.production-third      # 生产环境配置
│  │  ├─ .env.uat-third             # 测试环境配置
│  │  ├─ menus.ts                   # 项目菜单配置（重要）
│  │  └─ settings.js                # 项目配置（重要）
│  ├─ sharegood-ui                  # 内置公共组件（表单、表格等）（重要）

├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.js         # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.cjs       # stylelint 样式格式化配置
├─ .vcmrc                 # Git Commit 规范
├─ api-generator.js       # 接口生成配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ plopfile.js            # 自动生成文件配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vue.config.js          # 打包配置文件
```

### 运维部署 🔨
#### 测试环境
**.env.uat-third**
```
NODE_ENV = production
# 测试环境
VUE_APP_ENV = uat

BASE_URL = '/'

# 一期接口前缀
VUE_APP_BASEURL_API = 'http://192.168.1.175:9878'
# 二期服务地址
VUE_APP_BASEURL_API2 = 'http://192.168.1.175:9878'
VUE_APP_MOCK = false
VUE_APP_ERUDA = ''

VUE_APP_MOCK = false
```

**命令**
```bash
npm run build:uat
```

**nginx**
```
server {
        # 端口
        listen 9110;
        client_max_body_size 500M;
        client_header_buffer_size 128k;
        large_client_header_buffers 4 128k;

        gzip on;
        gzip_buffers 32 4K;
        gzip_comp_level 6;
        gzip_min_length 100;
        gzip_types application/javascript text/css text/xml;
        gzip_disable "MSIE [1-6].";
        gzip_vary on;

        # 本项目
        location / {
            root /data/projects/uat/fed-wenling;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;

            # 首页禁止缓存
            if ($request_filename ~ .*.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            }
            # 静态资源默认缓存14天
            if ($request_filename ~ .*.(js|css|png|jpg)$) {
                expires 336h;
            }
        }
       # 设计器地址
        location /fd {
            alias /data/projects/fat1/fed-template-formdesign/wl;
            try_files $uri $uri/ /fd/index.html;
            index index.html index.htm;

            # 首页禁止缓存
            if ($request_filename ~ .*.(htm|html)$) {
                add_header Cache-Control "no-cache,no-store";
            }
            # 静态资源默认缓存14天
            if ($request_filename ~ .*.(js|css|png|jpg)$) {
                expires 336h;
            }

        }

    }     

```



### 相关文档 🧩

#### 接口文档
部分接口，请查看`api-generator.js`

- http://api.fed.icinfo.co/new-zhxw-component/bank-query/default/wenling-2.0/

#### 设计稿

- http://192.168.1.147/product/%E6%B8%A9%E5%B2%AD%E6%99%BA%E6%85%A7%E5%B0%8F%E5%BE%AE%E4%BA%8C%E6%9C%9FV2.0/V2.0.0/ued/pc/index.html#s21

#### 产品原型

- http://192.168.1.147/product/%E6%B8%A9%E5%B2%AD%E6%99%BA%E6%85%A7%E5%B0%8F%E5%BE%AE%E4%BA%8C%E6%9C%9FV2.0/V2.0.0/axure/start.html#id=li97yp&p=____-v1-v2&g=1

### 相关人员 👨‍👨‍👦‍👦

- 产品：陈海峰、桂进宝
- 前端：李少伟、马金慧、庄尹
- 后端：刘响林、程亚运、程建鹏
- 设计：谢芳


### 开发指南 📚


#### 特性 ⭐

- 使用 Vue2 + TypeScript 开发，单文件组件JSX
- 采用 vue-cli4 作为项目开发、打包工具（配置 gzip打包、tsx 语法、跨域代理…）
- Vuex支持ts语法，更加容易维护
- 对Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 基于 Element 二次封装 `sharegood-ui`（表单、表格等）
- 支持 多主题布局
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载，支持页面按钮权限控制
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
- 常用自定义指令开发（权限、复制、水印、节流、防抖…）
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
- 使用 lint-staged 规范提交信息
- 基于plop的命令式路由配置，减少冲突
- 内置Mock方案
- 页面支持嵌套到其他项目中


#### 打包配置项说明
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

####  关于字典

```javascript
import { Dictionary } from '@/scripts/dict'
const 查询原因 = [
    {
        label: '贷后管理',
        value: 'a',
        class: '1',
    },
    {
        label: '贷款审批',
        value: 'b',
        class: '1',
    },
    {
        label: '信用卡审批',
        value: 'c',
        class: '1',
    },
] as const
const Dict = new Dictionary({
    // 不推荐中文
    查询原因: [...查询原因],
})


// 获取某个字典的某个option
const option = Dict.getOption('查询原因', '贷后管理')
console.log(option.label,option.value)
// 获取某个字典的所有option [{label,value}]
const options =  Dict.getOptions('查询原因')


```
#### 多项目的基础配置
`entry`下可以建多个项目，每个项目必须包含`settings.js`
```javascript
module.exports = {
    // 路由模式 history hash
    mode: 'history',
    // 项目标识 用于vuex 本地存储
    key: 'vue-template-admin',
    // index.html SEO title
    title: '项目标题',
    // index.html SEO keywords
    keywords: '',
    // index.html SEO description
    description: '项目介绍',
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
        title: '后台标题',
        // 是否使用标签页
        tagsView: true,
        // 后台板式 两种 layout-vertical layout-common
        layout: 'layout-common', 
        // 选定主题 theme-light
        theme: '',
    },
}
```


#### SvgIcon-图标组件
- 图标集中放置在 **@/components/SvgIcon/icons/** 目录里
- 单色模式(非'mt-'前缀)，大小继承至 font-size，颜色继承至 color
- 多色模式('mt-'前缀)，大小继承至 font-size，颜色则原始显示
- 建议：不要用中文命名，在一些项目下可能无法访问

比如有一个`home.svg`，使用
```html
<svg-icon icon='home' />
```

#### 接口请求实例


**src/scripts/http/index.ts**
```javascript
import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exApiHooks from './exApiHooks'
import exAuth from './exAuth'
import exData from './exData'
// axios实例
const http = createAxios(
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
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


#### 接口自动生成
配置`api-generator.js`后执行命令`npm run api`生成
```javascript
const axios = require('axios')
const { generate } = require('icinfo-api-generator')
async function main() {
    const apis = [
        'http://api.fed.icinfo.co/new-zhxw-component/bank-query/default/wenling-2.0/api.json',
        'http://api.fed.icinfo.co/new-zhxw-component/bank-model/bank-model/wenling-2.0/api.json',
        'http://api.fed.icinfo.co/new-zhxw-component/bank-user/bank-user/wenling-2.0/api.json',
        'http://api.fed.icinfo.co/bank/credit-process-component/credit-process/credit-process/wenling-2.0/api.json',
        'http://api.fed.icinfo.co/new-zhxw-component/zhxw-wenling-report/zhxw-wenling-report/wenling-2.0/api.json',
        'http://api.fed.icinfo.co/new-zhxw-component/zhxw-wenling-report/default/wenling-2.0/api.json',
    ]
    apis.forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            //mockDir: 'src/mock/auto',
            // 生成目录地址
            tsDir: 'src/entry/third/services/auto',
            merge: true,
            request: 'http2.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
            //include: ['/modelStrategy/switchUsingStatus'],
        })

        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()

```

使用
```javascript
import { getUserInfo } from '@/entry/third/services/auto/system'
try {
    // 获取用户信息
    const { data } = await getUserInfo({})

} catch (err) {
   
}

```
#### 本地数据 Mock

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


#### 菜单配置

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


### 浏览器支持 🌎

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |
