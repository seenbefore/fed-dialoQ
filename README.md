# 介绍

该项目为一个基于 `Vue2` + `TypeScript` 的多应用模板模板项目。包含多个基础项目的模板。

- 后台管理系统（src）或 (src/entry/admin)
- 移动端（src/entry/h5）
- 浙里办（src/entry/zlb-h5）
- 门户网站（src/entry/library）
- 大屏（src/entry/bigscreen）

[git地址](http://gitlab.icinfo.co/fed/base-vue-template)



# 功能介绍

- 支持多项目模板
- 配置支持动态更新
- 动态生成项目
- 动态拉取第三方项目模板



## 技术栈&工具

- Vue2、TypeScript、Vuex、Element、Nodejs、Nunjucks、inquirer
- node：版本推荐14.17.0
- vscode：代码编辑器



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

- `npm run base:init`

  - 初始化整个项目，去掉 `src/entry` 下的所有子项目，并且删除 `package.json` 中多余的脚本，将项目变为一个单纯的 `后台管理系统` 不带任何子项目。（注意：通过蜻蜓云效新建项目的时候，如果模板选择的是 `纯净模板` 则会默认执行 `base:init` 脚本）

- `npm run update:core`

  - 更新 `core` 文件夹的内容，首先会从 `http://gitlab.icinfo.co/fed/base-vue-template` 拉取 `master` 分支的 `core` 文件夹到 `.tmp` 临时文件夹中，然后对比 `core/config.json` 中的 `version` 和本地是否有差异。如果有差异，则会自动将拉取的 `core` 文件夹覆盖本地的 `core` 文件夹，并且会对比 `package.json` 文件是否有更新，如果有新增 `包/脚本`，会自动加入并且执行 `install`。
  - `强制更新`：如果想要不对比版本直接覆盖整个 `core` 文件夹，可以执行：`npm run update:core force`

- `npm run get:entry`

  - 用于获取子项目，子项目对应的内容存放位置
    - 后台管理系统：src/entry/admin
    - 移动端h5：src/entry/h5
    - 浙里办h5：src/entry/zlb-h5
    - 大屏：src/entry/bigscreen
    - 门户：src/entry/library
  - 依照提示选择对应的类型，并且输入子项目名称即可
    - `是否为定制项目`：关于该选项是用于处理项目是否要作为子项目独立存在还是作为外部项目的一个扩展（用外部项目的路由/store等）

- `npm run load`

  - 用于获取远程的指定文件内容
    - npm run load <sourceUrl> [targetUrl]
  - examples：把远程的 src/components 拉取到 src/abc/
    - npm run load src/components src/abc
      - 如果不带 `http` 链接默认会从本仓库目录下查找
  - examples：从别的参考获取内容。将 `icinfo-ui` 的 `master` 分支 的 `lib` 文件夹 拉取到我本地项目的 `test` 目录
    - npm run load http://gitlab.icinfo.co/fed/icinfo-ui/-/tree/master/lib test

- `npm run gen:report <fileName> <title> [insertToViews]`

  - 说明：用于快速生成一个 `表格列表页面`（包含页面和router）
  - 参数说明
    - `fileName`：用于生成的文件夹的名称（router的名称也会用该名称），如果名称中包含 `-` 则组件名称会自动去掉并且将首字母转换为大写（test-page => TestPage）
    - `title`：用于生成 `router` 的 `title`
    - `insertToViews`：是否将文件生成到 `src/views` 目录下。如果设置为 `false` 则会将文件生成在当前执行的目录下
  - examples：`npm run gen:report test-report 测试报表`

  ![image.png](http://cdn.qiniu.barebear.cn/74856a69-4099-4b3a-9538-8ee9baed95bc/dffca59470f2f60b793ec300c.png)

- `npm run gen:form <fileName> <title> [insertToViews]`

  - 说明：用于快速生成一个 `表单页面`（包含页面和router）
  - 使用方式参考：`gen:report`

- `npm run gen:detail <fileName> <title> [insertToViews]`

  - 说明：用于快速生成一个 `详情页面`（包含页面和router）
  - 使用方式参考：`gen:report`



## 目录

```bash
base-vue-template
├── .vscode                # VSCode 配置
├── core                   # 核心功能模块
├── docs                   # 文档
├── node_modules           # npm 依赖包
├── plop-templates         # Plop.js 模板
├── src                    # 源代码
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


```


## 开发
### 本地开发
- 基于`.env.development` 复制一份`.env.development.local`
- 在`.env.development.local`进行修改。接口前缀`VUE_APP_BASEURL_API`固定配置为`/@API`，接口代理`DEV_PROXY_TARGET_API`配置为联调地址，比如`http://127.0.0.1:8888/api`
- 接口函数自动生成：修改`api-generator.js`中`apis`（文档地址+/api.json），再执行`npm run api`

### 测试环境
- 配置文件为`.env.uat`
- 如果走nginx反向代理，则配置`VUE_APP_BASEURL_API`为`/@API`，否则配置`VUE_APP_BASEURL_API`为测试地址。

### 生产环境
- 配置文件为`.env.production`
- 如果走nginx反向代理，则配置`VUE_APP_BASEURL_API`为`/@API`，否则配置`VUE_APP_BASEURL_API`为生产地址。
