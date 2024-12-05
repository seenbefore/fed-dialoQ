# 介绍

该项目为一个基于 `Vue2` + `TypeScript` 的多应用模板模板项目。包含多个基础项目的模板。

-   后台管理系统：[src](./README.md)
-   移动端：[src/entry/h5](./src/entry/h5/README.md)
-   浙里办：[src/entry/zlb-h5](./src/entry/zlb-h5/README.md)
-   门户网站：[src/entry/library](./src/entry/library/README.md)
-   大屏：[src/entry/bigscreen](./src/entry/bigScreen/README.md)

[git 地址](http://gitlab.icinfo.co/fed/base-vue-template)

# 功能介绍

-   支持多项目模板
-   配置支持动态更新
-   动态生成项目
-   动态拉取第三方项目模板

## 技术栈&工具

-   Vue2、TypeScript、Vuex、Element、Nodejs、Nunjucks、inquirer
-   node：版本推荐 14.17.0
-   vscode：代码编辑器

### 安装使用步骤

#### clone

```bash
# 下载代码前设置下git（系统设置提交时转换为LF，检出时不转换 ）
git config --global core.autocrlf input
# 下载代码
git clone git@gitlab.icinfo.co:fed/base-vue-template.git
```

### install

```bash
npm install
```

### run

```bash
# 执行最外层（src）下的管理系统运行
npm run dev

# 如果想要运行 entry 下的子项目，需要自行在 package.json 中增加脚本
# cross-env VUE_APP_ENTRY=${entryDirName} vue-cli-service serve --open --mode=development
```

### build

```bash
# 执行最外层的
npm run build

# 如果想要运行 entry 下的子项目，需要自行在 package.json 中增加脚本
# cross-env VUE_APP_ENTRY=${entryDirName} vue-cli-service build --mode=production
```

# 其他脚本介绍

-   `npm run base:init`

    -   初始化整个项目，去掉 `src/entry` 下的所有子项目，并且删除 `package.json` 中多余的脚本，将项目变为一个单纯的 `后台管理系统` 不带任何子项目。（注意：通过蜻蜓云效新建项目的时候，如果模板选择的是 `纯净模板` 则会默认执行 `base:init` 脚本）

-   `npm run update:core`

    -   更新 `core` 文件夹的内容，首先会从 `http://gitlab.icinfo.co/fed/base-vue-template` 拉取 `master` 分支的 `core` 文件夹到 `.tmp` 临时文件夹中，然后对比 `core/config.json` 中的 `version` 和本地是否有差异。如果有差异，则会自动将拉取的 `core` 文件夹覆盖本地的 `core` 文件夹，并且会对比 `package.json` 文件是否有更新，如果有新增 `包/脚本`，会自动加入并且执行 `install`。
    -   `强制更新`：如果想要不对比版本直接覆盖整个 `core` 文件夹，可以执行：`npm run update:core force`

-   `npm run get:entry`

    -   用于获取子项目，子项目对应的内容存放位置
        -   后台管理系统：src/entry/admin
        -   移动端 h5：src/entry/h5
        -   浙里办 h5：src/entry/zlb-h5
        -   大屏：src/entry/bigscreen
        -   门户：src/entry/library
    -   依照提示选择对应的类型，并且输入子项目名称即可
        -   `是否为定制项目`：关于该选项是用于处理项目是否要作为子项目独立存在还是作为外部项目的一个扩展（用外部项目的路由/store 等）

-   `npm run load`

    -   用于获取远程的指定文件内容
        -   npm run load <sourceUrl> [targetUrl]
    -   examples：把远程的 src/components 拉取到 src/abc/
        -   npm run load src/components src/abc
            -   如果不带 `http` 链接默认会从本仓库目录下查找
    -   examples：从别的参考获取内容。将 `icinfo-ui` 的 `master` 分支 的 `lib` 文件夹 拉取到我本地项目的 `test` 目录
        -   npm run load http://gitlab.icinfo.co/fed/icinfo-ui/-/tree/master/lib test

-   `npm run gen:report <fileName> <title> [insertToViews]`

    -   说明：用于快速生成一个 `表格列表页面`（包含页面和 router）
    -   参数说明
        -   `fileName`：用于生成的文件夹的名称（router 的名称也会用该名称），如果名称中包含 `-` 则组件名称会自动去掉并且将首字母转换为大写（test-page => TestPage）
        -   `title`：用于生成 `router` 的 `title`
        -   `insertToViews`：是否将文件生成到 `src/views` 目录下。如果设置为 `false` 则会将文件生成在当前执行的目录下
    -   examples：`npm run gen:report test-report 测试报表`

    ![image.png](http://cdn.qiniu.barebear.cn/74856a69-4099-4b3a-9538-8ee9baed95bc/dffca59470f2f60b793ec300c.png)

-   `npm run gen:form <fileName> <title> [insertToViews]`

    -   说明：用于快速生成一个 `表单页面`（包含页面和 router）
    -   使用方式参考：`gen:report`

-   `npm run gen:detail <fileName> <title> [insertToViews]`

    -   说明：用于快速生成一个 `详情页面`（包含页面和 router）
    -   使用方式参考：`gen:report`

## 目录

```bash
├── .vscode                # VSCode 配置
├── core                   # 核心功能模块
├── docs                   # 文档
├── node_modules           # npm 依赖包
├── plop-templates         # Plop.js 模板
├── src                    # 源代码
    ├── views              # 页面
        ├── user-manage    # 用户管理
            ├── index.vue  # 用户管理页面
            ├── router.js  # 用户管理路由
            ├── api.ts      # 用户管理接口
            ├── enum.ts     # 用户管理枚举
            ├── components  # 用户管理组件
├── tests                  # 测试文件
├── .editorconfig          # 编辑器配置
├── .env                   # 环境变量
├── .env.development       # 开发环境变量
├── .env.fat               # FAT 环境变量
├── .env.production        # 生产环境变量
├── .env.uat               # UAT 环境变量
├── .eslintignore          # ESLint 忽略文件
├── .eslintrc.js           # ESLint 配置
├── .gitignore             # Git 忽略文件
├── .prettierignore        # Prettier 忽略文件
├── .prettierrc.js         # Prettier 配置
├── .stylelintignore       # Stylelint 忽略文件
├── .stylelintrc.js        # Stylelint 配置
├── .travis.yml            # Travis CI 配置
├── .vcmrc                 # VCM 配置
├── api-generator.js       # API 生成器
├── api.rest               # API 规范
├── babel.config.js        # Babel 配置
├── jsconfig.json          # JavaScript 配置
├── package-lock.json      # npm 锁定文件
└── package.json           # npm 配置文件
```

## core 目录

```bash
core
├── build                          # 构建相关内容
│   ├── alias.js                   # 别名都存储在这，会动态将 src/entry 目录下的所有文件都增加一个别名，规则：@文件名称、
│   ├── ........
├── common                         # 公共模块
│   ├── configurations             # 配置文件
│   │   ├── initConfig             # 初始化一些配置（其实就是把 main.ts 相同的部分内容抽离出来了，包含各个类型文件的初始化配置）
│   │   ├── VueConfig              # vue.config.js 的公共配置抽离
│   ├── hooks                      # 一些自定义的钩子函数
│   ├── http                       # 公共的 HTTP 请求处理
│   ├── public                     # 公共资源
│   ├── router                     # 公共的路由管理
│   ├── store                      # 公共的状态管理
│   └── template                   # 公共的模板管理（index.html）
├── developmentTools               # 该文件夹用于开发生成个类型代码
│   ├── generatePage               # 页面生成（用于生成 report、form、detail）
│   │   ├── common.js              # 公共功能（用于加载模板，生成对应的代码，处理文件名称之类的）
│   │   └── report.js              # 表格页面生成
│   │   └── form.js                # 表单页面生成
│   │   └── detail.js              # 详情页面生成
│   ├── getTemplate                # 根据脚本获取对应的模板（gen:entry 脚本相关内容)
│   │   └── index.js               # 入口文件（gen:entry 脚本执行的入口文件）
│   │   └── ........
│   ├── init                       # 初始化项目模板（base:init 脚本相关内容）
│   │   └── index.js               # 入口文件（base:init 执行的入口文件）
│   ├── loadFileToBaseTemplate     # 加载文件到模板项目（load 脚本相关内容）
│   │   └── index.js               # 入口文件（load 脚本执行的入口文件）
│   └── updateCore                 # 更新 core 模块相关内容（update:core 脚本）
│   │   └── index.js               # 入口文件（update:core 脚本执行的入口文件）
│   │   └── ........
├── share                          # 共享模块
│   └── log                        # 日志管理
├── utils                          # 工具函数
│   ├── file.js                    # 文件处理
│   ├── gitHelpers.js              # Git 辅助功能
│   ├── path.js                    # 路径处理
│   ├── platform.js                # 平台相关功能
│   ├── run.js                     # 运行相关功能
│   ├── validate.js                # 验证功能
│   └── write.js                   # 文件写入相关功能
├── config.json                    # 配置文件
└── README.md                      # 项目说明文档，包含更新内容
```

## 使用

该项目一般不会单独使用，可通过蜻蜓云效新建仓库的时候选择 `多项目基础模板-纯净版`

![image.png](http://cdn.qiniu.barebear.cn/aa8036fa-e36a-49c9-aff4-36457fe43521/dffca59470f2f60b793ec300d.png)

# PC 端开发

## 环境配置
**反向代理规则**：`VUE_APP_BASEURL_API`和`DEV_PROXY_TARGET_API`配对。如果要新增多个代理，可以按照上述变量新增，并在`_API`后缀添加相同变量，然后重启服务即可，比如：
```bash
# 代理地址2
VUE_APP_BASEURL_API_ADMIN='/@API_ADMIN'
DEV_PROXY_TARGET_API_ADMIN='http://192.168.1.155:8885/api'
```

### 本地开发

-   基于`.env.development` 复制一份`.env.development.local`
-   在`.env.development.local`进行修改。接口前缀`VUE_APP_BASEURL_API`固定配置为`/@API`，接口代理`DEV_PROXY_TARGET_API`配置为联调地址，比如`http://127.0.0.1:8888/api`
-   接口函数自动生成：修改`api-generator.js`中`apis`（文档地址+/api.json），再执行`npm run api`

### 测试环境

-   配置文件为`.env.uat`
-   如果走 nginx 反向代理，则配置`VUE_APP_BASEURL_API`为`/@API`，否则配置`VUE_APP_BASEURL_API`为测试地址。

### 生产环境

-   配置文件为`.env.production`
-   如果走 nginx 反向代理，则配置`VUE_APP_BASEURL_API`为`/@API`，否则配置`VUE_APP_BASEURL_API`为生产地址。



## 请求管理

请求管理位于`src/scripts/http`目录下，包含`http.ts`文件。可以配置多个不同源的请求，比如`httpPDFURL`、`httpDoc`等。

### 核心配置

-   `exHooks`：请求拦截器，可以配置多个拦截器，拦截器名称对应`core/common/http/hooks`目录下的文件名称。
-   `baseURL`：请求基础 URL，如果配置了该值，则会使用该值作为基础 URL，否则使用`VUE_APP_BASEURL_API`作为基础 URL。
-   `isResponseSuccess`：是否为成功响应，默认值为`(res) => res.code == undefined || res.code === 0 || res.code === 200`。
-   `getResponseSuccess`：获取成功响应内容，默认值为`(res) => res`。
-   `getResponseError`：获取错误响应内容，默认值为`(res) => ({ message: res.message || '网络走神了', code: res.code || '-1' })`。
-   `notDeduplicate`：是否不允许重复请求（针对于单独请求），默认值为`false`。
-   `useDeduplicate`：是否开启不允许重复请求功能，默认值为`false`。
-   `deduplicateFilter`：重复请求过滤配置，默认值为`() => false`。

### 使用案例

-   一般接口函数位于`src/services`目录下。由`api-generator.js`自动生成。

```typescript
/**
 * @file API：default
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'

/**
 * 登录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function login(
    data?: {
        /** 用户名 */ username: string
        /** 密码 */ password: string
        /** 登录类型 */ loginType: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<UserInfoVo>>({
        url: '/login',
        type: 'POST',
        data,
        ...options,
    })
}

export interface ErrorInfo {
    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string
}

export interface Result<T> {
    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]
}

export interface UserInfoVo {
    /**
     * 真实姓名
     */
    realName: string

    /**
     * 登录类型
     */
    loginType: string

    /**
     * 用户名
     */
    username: string

    /**
     * token
     */
    token: string
}
```

## 路由

路由由系统自动生成，无需手动配置。满足以下条件即可：

-   在`src/views`目录下新建业务文件夹
-   包含路由文件`router.js`
-   包含页面文件`index.vue`

### 路由属性

-   `name`：路由名称，用于在`router`中使用
-   `meta`：路由元信息，用于在`router`中使用
    -   `bodyClass`：设置`body`标签的`class`
    -   `parent`：父级路由名称，默认值为`Index`，不需要修改。
    -   `title`：路由标题，用于设置当前路由的标题
    -   `keepAlive`：是否缓存页面，用于设置当前路由是否缓存页面
    -   `requireAuth`：是否需要登录，用于设置当前路由是否需要登录
    -   `aliveOnlyTo`：缓存页面仅在指定路由中缓存，用于设置当前路由缓存页面仅在指定路由中缓存，一般用于移动端。
    -   `activeMenu`：当前激活菜单，用于设置当前路由激活的菜单。比如进入`文章新增`页面时应该将`文章管理`设置为激活菜单。

## 状态管理

状态管理位于`src/store`目录下，包含`modules`和`useStore.ts`文件。

-   `modules/user.ts`为登录用户信息管理
-   `modules/settings.ts`为系统配置管理
-   `modules/tagsView.ts`为标签页管理
-   `modules/app.ts`为系统业务配置管理

### 使用案例

#### 配置

-   `Mutation`函数名称推荐使用小驼峰式`setXyz`
-   `Action`函数名称推荐以`sync`开头，比如`syncSomething`
-   项目业务相关的本地存储推荐在`app`模块中配置，属性名称推荐以`$`开头，比如`$dontShowDeleteConfirm`

```typescript
@Module({
    name: 'app',
    namespaced: true,
    stateFactory: true,
})
export default class AppModule extends BaseAppStore {
    /**
     *  是否不显示移动出卷宗目录的确认框
     * */
    public $dontShowDeleteConfirm = false
    /**
     *  设置是否不显示移动出卷宗目录的确认框
     * */
    @Mutation
    public setDontShowDeleteConfirm(value: boolean) {
        this.$dontShowDeleteConfirm = value
    }
    @Action
    public syncSomething() {
        // 异步处理某些内容
        return new Promise(resolve => {
            this.setDontShowDeleteConfirm(false)
            resolve('')
        })
    }
}
```

#### 使用

```typescript
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { userStore, appStore } from '@/store/useStore'

@Component({
    name: 'Step2',
    components: {},
})
export default class Step2 extends Vue {
    async login() {
        userStore.setPermissionMenus([])
        userStore.login('token123')
        userStore.setUserInfo({
            name: '张三',
            username: 'zhangsan',
            sex: 1,
            role: 'admin',
            position: '开发',
        })
    }
    async loginOut() {
        await userStore.fedLogOut()
    }
    async syncData() {
        const { $dontShowDeleteConfirm } = appStore
        console.log($dontShowDeleteConfirm)
        await appStore.syncSomething()
    }
}
```

## 动态弹窗组件

### vue 组件中使用

```vue
<template>
    <div>
        <button @click="openDialog">打开弹窗</button>
    </div>
</template>
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Step2',
})
export default class Step2 extends Vue {
    async openDialog() {
        const res = await this.$modalDialog(() => import('@/components/UserEditDialog/index.vue'), {
            isEdit: true,
        })
        if (res) {
            console.log('确认')
        } else {
            console.log('取消')
        }
    }
}
</script>
```

### 非 vue 组件中使用

```typescript
import { initModalDialog } from '@/scripts/ModalDialog'
import store from '@/store'
import router from '@/router'
const modalDialog = initModalDialog({ store, router })
modalDialog(() => import('@/components/UserEditDialog/index.vue'), {
    isEdit: true,
})
```

## 标签页

标签页位于`src/store/modules/tagsView.ts`文件中。

### 关闭当前标签页并跳转

定义全局函数

```typescript
import { tagsViewStore } from '@/store/useStore'
/**
 * 关闭当前标签页并跳转到对应路由
 */
Vue.prototype.$back = async function(params: any) {
   
}
```

`vue.d.ts`定义

```typescript
declare module 'vue/types/vue' {
    class C {}
    interface Vue {
        $back: (params: any) => void
    }
}
```

使用

```vue
<template>
    <button @click="closeCurrentView">关闭当前标签页</button>
</template>
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Step2',
})
export default class Step2 extends Vue {
    // 关闭当前标签页并跳转到对应路由
    async closeCurrentView() {
        await this.$back({
            path: '/file-review/case-config'
        })
    }
}
</script>
```

## 主题配置

主题配置位于`src/scripts/desktopMainInit/index.ts`文件中。

```typescript
// 设置自定义主题名称和色系
settingsStore.updateThemeName('blue')
let themeVariables: IDefinedThemeValue = {
    '--color-primary': '#06f',
    '--color-success': '#6DD400',
    '--color-warning': '#FF7D00',
    '--color-danger': '#F4333C',
    '--color-info': '#666666',
}
settingsStore.updateThemeVariables(themeVariables)
```

## 全局 svg

-   全局 svg 位于`src/components/SvgIcon/icons`目录下，会自动注册。
-   `mt-`前缀为多色图标。

```vue
<template>
    <svg-icon icon="icon-name"></svg-icon>
</template>
```

## 作为第三方应用

项目中的页面可以作为第三方应用在其他项目中通过`iframe`引用。比如地址`http://127.0.0.1:8888/file-review/my-case/save?token=123&isThirdParty=1`。

-   `token`：主应用的登录 token，用于获取用户信息
-   `isThirdParty`：是否为第三方应用，用于标识当前应用为第三方应用，并且隐藏头部和侧边栏

## 组件

-   全局组件位于`src/components/global`目录下。会自动注册，不需要在`main.ts`中手动注册。组件名称以`my-`开头。
-   其他组件位于`src/components`目录下。不会自动注册，需要手动注册。

### confirmDialog 确认框

确认框组件，包含`warning`、`error`、`success`三种类型。[文档地址](./src/components/confirmDialog/README.md)

#### 自定义确认框风格样式

```typescript
import { useConfirm, IUseConfirm } from '@/components/confirmDialog/useConfirm'
// 自定义确认框风格样式
const customConfirm = (options: IUseConfirm | string) => {
    const defaultOptions = {
        title: '提示',
        titleIcon: 'el-icon-warning',
        titleIconStyle: 'color: var(--color-warning)',
    } as IUseConfirm

    const finalOptions = typeof options === 'string' ? { ...defaultOptions, message: options } : { ...defaultOptions, ...options }

    return useConfirm(finalOptions)
}

Vue.prototype.$confirm = customConfirm
```

#### 使用

```vue
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
@Component({
    name: 'CaseSave',
})
export default class CaseSave extends Vue {
    async handleDelete() {
        await this.$confirm('是否确认删除？')
        // 删除操作
    }
}
</script>
```

### sg-base-form 基础表单

基础表单组件，[文档地址](./src/sharegood-ui/packages/base-form/README.md)

```html
<template>
    <div class="inner">
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel"></sg-base-form>
    </div>
</template>

<script lang="tsx">
    import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
    import { FormRow, FormColumn, FormRef } from '@/sharegood-ui'

    @Component({
        name: 'CaseSave',
        components: {},
    })
    export default class CaseSave extends Vue {
        @Ref('formRef')
        formRef!: FormRef

        formModel: Record<string, any> = {}
        get getFormAttrs() {
            const fields: FormRow[] = [
                {
                    columns: [
                        {
                            span: 24,
                            tag: 'input',
                            name: 'description',
                            itemAttrs: {
                                label: '本卷情况说明',
                                rules: [
                                    { required: true, message: '请输入本卷情况说明' },
                                    { max: 500, message: '最多输入500字' },
                                ],
                            },
                            attrs: {
                                type: 'textarea',
                                rows: 6,
                                placeholder: '请输入',
                                maxlength: 500,
                                'show-word-limit': true,
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'creator',
                            itemAttrs: {
                                label: '立卷人',
                                rules: [
                                    { required: true, message: '请输入立卷人' },
                                    { max: 50, message: '最多输入50字' },
                                ],
                            },
                            attrs: {
                                placeholder: '请输入',
                                maxlength: 50,
                            },
                        },
                        {
                            tag: 'date',
                            name: 'createTime',
                            itemAttrs: {
                                label: '立卷时间',
                                rules: [{ required: true, message: '请选择立卷时间' }],
                            },
                            attrs: {
                                type: 'date',
                                placeholder: '请选择日期',
                                'value-format': 'yyyy-MM-dd',
                                'picker-options': {
                                    disabledDate: (time: Date) => {
                                        return time.getTime() > Date.now()
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    columns: [
                        {
                            tag: 'input',
                            name: 'reviewer',
                            itemAttrs: {
                                label: '检查人',
                                rules: [
                                    { required: true, message: '请输入检查人' },
                                    { max: 50, message: '最多输入50字' },
                                ],
                            },
                            attrs: {
                                placeholder: '请输入',
                                maxlength: 50,
                            },
                        },
                        {
                            tag: 'date',
                            name: 'reviewTime',
                            itemAttrs: {
                                label: '检查时间',
                                rules: [{ required: true, message: '请选择检查时间' }],
                            },
                            attrs: {
                                type: 'date',
                                placeholder: '请选择日期',
                                'value-format': 'yyyy-MM-dd',
                                'picker-options': {
                                    disabledDate: (time: Date) => {
                                        return time.getTime() > Date.now()
                                    },
                                },
                            },
                        },
                    ],
                },
            ]

            return {
                span: 12,
                fields,
            }
        }
        async submit() {
            await this.formRef.validate(null, true)
            return this.formModel
        }
    }
</script>

<style lang="less" scoped></style>
```

### sg-data-view 基础列表

列表组件，[文档地址](./src/sharegood-ui/packages/data-view/README.md)

```html
<template>
    <!-- 列表 -->
    <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
</template>

<script lang="tsx">
    import { Component, Vue, Ref } from 'vue-property-decorator'
    import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'

    @Component({
        name: 'CaseDialog',
        components: {},
    })
    export default class CaseDialog extends Vue {
        @Ref('tableRef') tableRef!: TableRef

        get getTableAttrs() {
            const columns: TableColumn[] = [
                {
                    label: '名称',
                    prop: 'name',
                    minWidth: '200px',
                },
                {
                    label: '编号',
                    prop: 'code',
                    minWidth: '200px',
                },
                {
                    label: '对象',
                    prop: 'target',
                    minWidth: '120px',
                },
                {
                    label: '创建日期',
                    prop: 'createDate',
                    width: '170px',
                },
                {
                    label: '操作',
                    prop: 'action',
                    width: '80px',
                    fixed: 'right',
                    render: (h, { row }) => {
                        return (
                            <el-button type="text" onClick={() => this.handleSelect(row)}>
                                选择
                            </el-button>
                        )
                    },
                },
            ]

            return {
                // pageVisible: false,
                load: async (params: any = {}) => {
                    const { data } = await this.getList(params)
                    return {
                        result: data,
                        total: data.total,
                    }
                },
                columns,
            }
        }
        // 触发查询load
        handleSearch() {
            this.tableRef.onLoad({ page: 1 })
        }
        // 获取列表数据
        async getList(params: any = {}) {
            return {
                data: {
                    data: [],
                    total: 0,
                },
            }
        }
    }
</script>
```

### step-form 表单步骤

表单步骤组件，可以通过 json 配置表单步骤。[文档地址](./src/components/step-form/README.md)

```vue
<template>
    <div class="sg-page icinfo-ai CaseSave">
        <StepForm v-model="currentStep" :steps="steps"></StepForm>
    </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import StepForm, { StepConfig } from '@/components/step-form/index.vue'
@Component({
    name: 'CaseSave',
    components: {
        StepForm,
    },
})
export default class CaseSave extends Vue {
    /** 当前步骤 */
    currentStep = 0
    get steps() {
        return [
            // 第一步
            {
                title: '卷宗封面',
                component: () => import('@/views/file-review/components/case-step-cover/index.vue'),
                props: {
                    // 传递给组件的属性
                },
                render: (h, { row, handlers }) => {
                    return (
                        <div>
                            <el-button
                                type="primary"
                                onClick={async () => {
                                    // 获取当前组件
                                    const currentComponent = handlers.getCurrentComponent()
                                    // 保存当前组件数据
                                    const result = await currentComponent.save()
                                    // 下一步
                                    handlers.next()
                                }}
                            >
                                下一步
                            </el-button>
                        </div>
                    )
                },
            },
        ]
    }
}
</script>
```

### draggable-table 拖拽表格

拖拽表格组件，[文档地址](./src/components/draggable-table/README.md)

示例代码

```vue
<template>
    <draggable-table :data="tableData" :columns="columns" :actions="actions" @drag-end="handleDragEnd"></draggable-table>
</template>
<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import DraggableTable from '@/components/draggable-table/index.vue'

export default class CaseSave extends Vue {
    tableData = [
        { id: 1, name: '张三', age: 18, attachments: true },
        { id: 2, name: '李四', age: 20, attachments: false },
    ]
    get tableAttrs() {
        return {
            columns: [
                { prop: 'sort', label: '序号', width: '50px' },
                { prop: 'name', label: '名称', minWidth: '200px' },
                {
                    prop: 'attachments',
                    label: '含附件',
                    width: '100px',
                    render: (h, { row }) => {
                        return <el-checkbox v-model={row.attachments}></el-checkbox>
                    },
                },
            ],
            actions: [
                {
                    key: 'delete',
                    icon: 'el-icon-delete',
                    handler: this.handleDelete,
                    tooltip: '删除',
                },
            ],
        }
    }
    handleDragEnd(newData: any) {
        this.tableData = newData
        // 可以在这里处理排序后的数据，如调用接口保存新的排序
    }
    async handleDelete(row: any, context: any) {
        // 处理删除逻辑
        await this.$confirm('确定删除吗？')
        // 拖拽组件提供的删除行方法
        context.removeItem(row)
    }
}
</script>
```
