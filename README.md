## 介绍
基于`Vue2`+`TypeScript`的多应用模板
- 后台管理系统（src）
- 移动端（src/entry/h5）
- 浙里办（src/entry/zlb-h5）
- 门户网站（src/entry/library）
- 大屏（src/entry/bigscreen）
- 第三方内嵌平台(src/entry/third)
- 监控平台(src/entry/monitor)



### 后台管理系统安装使用步骤

- **Clone：**

```bash
# 下载代码前设置下git（系统设置提交时转换为LF，检出时不转换 ）
git config --global core.autocrlf input
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


### 文件资源目录

```bash

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


