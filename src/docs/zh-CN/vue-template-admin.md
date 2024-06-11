## vue-template-admin 通用后台管理模板

### 快速开始

创建项目
```bash
# 选择 `vue-template-admin` 模板
$ npm run entry
# 项目生成后位置`src/entry/项目名`
```

新建页面
```bash
# 注意后台菜单页面的路由配置需要勾选：二级路由&授权访问
$ npm run spa
```


启动服务
```bash
$ npm run dev:项目名
```

打包部署
```bash
# 开发环境
$ npm run build:fat:项目名

# 正式环境
$ npm run build:prd:项目名
```


### API请求
**项目名/scripts/http/index.ts**
```javascript
import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
// API自定义拦截器
import exApiHooks from './exApiHooks'
// 登录鉴权
import exAuth from './exAuth'
// 数据处理
import exData from './exData'

const http = createAxios(
    {
        headers: 
            'Content-Type': 'application/json;charset=UTF-8',
            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        timeout: 30 * 1000, // 默认超时30s
        baseURL: process.env.VUE_APP_BASEURL_API,
        // 业务请求是否成功
        isResponseSuccess(res: ExApiResponse) {
            if (res.code === 0 || res.code === 200) {
                return true
            } else {
                return false
            }
        },
        // 成功数据json
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

export default http

```

`http`已挂载在`Vue`原型链上，可在组件中直接使用
```javascript

// 组件中
await this.$http.request({url:'/xxx'})

// 使用api-server生成的函数
import * as InstanceService from '../../services/instance.ts'
await InstanceService.list({
    pageNum:1
})
```

**利用api-server生成函数和mock数据**
**配置api-generator.js**
```javascript
const axios = require('axios')
const { generate } = require('icinfo-api-generator')

async function main() {
    ;[
        'http://api.fed.icinfo.co/zzk/dtcenter/dt-qualities/develop/api.json',
    ].forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            mockDir: 'src/template-entry/vue-template-admin/mock/data',
            tsDir: 'src/template-entry/vue-template-admin/services',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
            newLine: '\n',
        })

        // eslint-disable-next-line no-console
        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()

```

运行
```bash
$ node api-generator.js
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


### 登录

**views/login/index.vue**
```javascript
// 必填 保存用户信息  store.state.user.info
this.$store.commit('user/setUserInfo', {
    name: data.name,
})
// 可选 保存用户菜单  store.state.user.user_menus
this.$store.commit('user/setUserMenus', [])
// 必填 设置登录token 
this.$store.commit('user/LOGIN', 'token1234')


// 可选 如果有顶级菜单，根据顶级菜单渲染左侧不同的菜单 则需要调用
this.$store.commit('user/SET_TOP_MENU')

```




### 路由访问流程
**registerInterceptor.ts**



**推荐：页面刷新后重新获取菜单信息**
```javascript
async function GetInfo() {
    // http请求数据
    return Promise.resolve({
        menus: [],
    }).then(({ menus }) => {
        // 保存菜单
        store.commit('user/setUserMenus', menus)
        return { menus }
    })
}
```

**页面刷新后使用登录时的菜单**
```javascript
// 获取登录时获取的菜单数据
async function GetInfo() {
    const user_menus = store.state.user.user_menus || []
    return Promise.resolve({
        menus: user_menus,
    })
}
```


**路由访问说明**
![](https://tva1.sinaimg.cn/large/008i3skNly1gs1982sr2xj30lz0l80uk.jpg)

### 页面路由配置
```javascript
export default {
    path: '/system/user/edit',
    meta: {
        activeMenu:'/system/user', // 当一些路由不在菜单项又需要在左侧高亮，配置需要高亮的菜单地址
        parent: 'Index', // 二级菜单的父级
        title: 'dashboard',
        requireAuth: true, // 二级菜单都需要授权访问
        noCache: false // 不需要缓存则设置true
    },
}

```

### 布局和主题
**views/index/index.vue** 
配置左侧菜单、顶部导航、右侧主体的内容和样式

**settings.js**

```javascript
module.exports = {
    mode: 'history',
    key: 'vue-template-admin',
    title: 'PC端后台管理应用',
    keywords: '',
    description: 'PC端后台管理应用',
    filename: 'index.html',
    settings: {
        title: '前端小书房',
        tagsView: true, // 是否需要标签页
        layout: 'layout-vertical', // layout-vertical 纵向布局 layout-common 常规
        theme: 'theme-light2', // theme-light 系统提供的白色主题 
    },
}
```

 

**css变量 src/layout/admin/theme/index.less** 
```less
:root {
    // 主题色
    --system-primary-color: #409eff; // 可做背景色和文本色，用做背景色时，需要和--system-primary-text-color配合使用，避免文件颜色和主题色冲突
    --system-primary-text-color: #fff; // 主题色作为背景色时使用

    // logo颜色相关
    --system-logo-color: #f1f1f1;
    --system-logo-background: #263445;

    // 菜单颜色相关
    --system-menu-width: 200px;
    --system-menu-text-color: #bfcbd9;
    --system-menu-background: #28415a;
    --system-menu-children-background: #1f2d3d;
    --system-menu-submenu-active-color: #fff;
    --system-menu-hover-background: #203448;
    --system-menu-height: 50px;

    // header区域
    --system-header-height: 50px;
    --system-header-background: #fff;
    --system-header-text-color: #bbb;
    --system-header-breadcrumb-text-color: #97a8be;
    --system-header-item-hover-color: #000;
    --system-header-border-color: #d8dce5;
    --system-header-tab-background: #fff;

    // contaier区域，父框架
    --system-container-background: #f0f2f5;
    --system-container-main-background: #fff;

    // 页面区域, 这一块是你在自己写的文件中使用主题，核心需要关注的地方
    --system-page-background: #fff; // 主背景
    --system-page-color: #303133; // 主要的文本颜色
    --system-page-tip-color: rgba(0, 0, 0, 0.45); // 协助展示的文本颜色
    --system-page-border-color: #000; // 通用的边框配置色，便于主题扩展

    // element主题色修改
    --el-color-primary: var(--system-primary-color);
}
```

**自定义主题** `style.less` 中添加自己的主题风格
```less

.app-wrapper.theme-light2 {
    --system-menu-background: #fff;
    --system-menu-text-color: #333;
    --system-menu-submenu-active-color: #4e7fff;
    --system-menu-children-background: #f7f7f7;
    --system-menu-hover-background: #ddd;
    --system-menu-height: 50px;
    .app-navbar {
        .app-container {
            background-image: linear-gradient(90deg, #0750e4 0%, #45a2ff 85%);
            color: #fff;
        }
    }
    // 侧边栏
    .app-sidebar {
        // 背景色
        background-color: #fff;
        box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.3);
        // top: 0;
        // z-index: 102;

        .el-scrollbar__view {
            // 一级菜单
            > .el-menu {
                > div {
                    > a {
                        .el-menu-item {
                            background-color: #fff !important;
                            // font-weight: bold;
                            &:hover {
                                background-color: #fff !important;
                            }
                        }
                        .el-menu-item.is-active {
                            background-color: #fff !important;
                            color: #2064ef !important;
                            > .sub-el-icon {
                                color: #2064ef !important;
                            }
                        }
                    }

                    > .el-submenu {
                        > .el-submenu__title {
                            background-color: #fff !important;
                            // font-weight: bold;
                            > .el-submenu__icon-arrow {
                                // display: none;
                            }
                        }
                        &:hover {
                            background-color: #fff !important;
                        }
                        // 二级菜单
                        > .el-menu {
                            > div {
                                > .el-submenu {
                                    &.is-opened {
                                        > .el-submenu__title {
                                            .el-submenu__icon-arrow {
                                                transform: rotateZ(0deg);
                                            }
                                        }
                                    }
                                    > .el-submenu__title {
                                        background-color: #f7f7f7 !important;
                                    }
                                    // 三级菜单
                                    > .el-menu {
                                        > div {
                                            > .el-submenu {
                                                > .el-submenu__title {
                                                    background-color: #f0f0f0 !important;
                                                }
                                                // 四级菜单
                                                > .el-menu {
                                                    > div {
                                                        > .el-submenu {
                                                            > .el-submenu__title {
                                                                background-color: #e5e5e5 !important;
                                                            }
                                                            // 五级菜单
                                                            > .el-menu {
                                                                > div {
                                                                    > .el-submenu {
                                                                        > .el-submenu__title {
                                                                            background-color: #d4d4d4 !important;
                                                                        }
                                                                    }
                                                                    > a {
                                                                        .el-menu-item {
                                                                            background-color: #d4d4d4 !important;
                                                                        }
                                                                        .el-menu-item.is-active {
                                                                            background-color: #4e7fff !important;
                                                                            color: #fff !important;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        > a {
                                                            .el-menu-item {
                                                                background-color: #e5e5e5 !important;
                                                            }
                                                            .el-menu-item.is-active {
                                                                background-color: #4e7fff !important;
                                                                color: #fff !important;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            > a {
                                                .el-menu-item {
                                                    background-color: #f0f0f0 !important;
                                                }
                                                .el-menu-item.is-active {
                                                    background-color: #4e7fff !important;
                                                    color: #fff !important;
                                                }
                                            }
                                        }
                                    }
                                }
                                > a {
                                    .el-menu-item {
                                        background-color: #f7f7f7 !important;
                                    }
                                    .el-menu-item.is-active {
                                        background-color: #4e7fff !important;
                                        color: #fff !important;
                                    }
                                }
                            }
                        }
                    }

                    > .is-active {
                        > .el-submenu__title {
                            background-color: #f3f9ff !important;
                            color: #2064ef !important;
                            .sub-el-icon {
                                color: #2064ef;
                            }
                        }
                    }
                }
            }
        }
    }
}
```

> 注意：IE不支持CSS变量

### store

```javascript

const actions = {
    // 退出登录
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('SET_ROLES', [])
            commit('logout', null)
            resolve()
            
        }).then(() => {
            // 跳转到第三方登录 location.href = LOGIN_URL
            // 自带登录系统
            location.reload()
        })
    },
}

```

### NGINX


```
server {
    # 改
    listen 3830;
    client_max_body_size 500M;
    client_header_buffer_size 128k;

    large_client_header_buffers 4 128k;

    # 开启gzip压缩
    gzip on;
    gzip_comp_level 3;
    gzip_types text/plain text/javascript text/css application/x-javascript application/javascript application/json image/svg+xml image/*;
    gzip_http_version 1.1;
    # 如果需要反向代理
    location /openapi/ {
        # 改 后端地址
        proxy_pass http://hxwechatt.natapp4.cc/;
    }
    location / {
        # 改 项目地址
        root /data/projects/fat1/sharegood-element-ui;
        try_files $uri $uri/ /index.html;
        index index.html index.htm;

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