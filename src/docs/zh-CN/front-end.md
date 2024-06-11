## 前端研发流程闭环 
[![hCGQht.png](https://z3.ax1x.com/2021/08/23/hCGQht.png)](https://imgtu.com/i/hCGQht)


## 开通账号
- 开通公司邮箱，下载foxmail配置邮箱，[地址](http://mail.icinfo.com.cn/extmail/cgi/index.cgi)
- 开通git账号，[地址](http://gitlab.icinfo.co/)
- 开通jira账号，[地址](http://jira.icinfo.co/)
- [wiki-前端地址](http://wiki.icinfo.co/pages/viewpage.action?pageId=10323301)


## 环境安装
|   名称   | 版本  |  备注  |
| --- |--- |--- |
| node | v0.10.28+ |  |
| 2.24.1  |2.24.1+ |  |
| nginx  | 1.18+ |  |


## 开发利器

### VSCode

-   必要插件
    -   `ESLint`
    -   `Vetur`
    -   `Prettier - Code formatter`
    -   `path Autocomplete`
-   推荐插件
    -   `stylelint`
    -   `vscode-element-helper` (element-ui 专用)
    -   `Debugger for Chrome`
    -   `GitLens -- Git supercharged`
    -   

### Chrome 
  -   必要插件
      -   `vue-devtools`
  -   推荐插件
      -   `json-formatter`


## 代码风格

- 默认编码：utf-8
- 默认缩进：4个空格
- 尽可能不要分号
- 默认单引号
- 默认换行：LF
- 代码格式化：prettier

项目根目录`.vscode` > `settings.json`
```javascript
{
    "files.eol": "\n",
    "editor.codeLens": true,
    "editor.minimap.enabled": true,
    "editor.minimap.renderCharacters": false,
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "window.title": "${dirty}${activeEditorMedium}${separator}${rootName}",
    // 重新设定tabsize
    "editor.tabSize": 4,
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "javascript.suggest.autoImports": false,
    //  #让prettier使用eslint的代码格式进行校验
    // "prettier.eslintIntegration": true,
    //  #去掉代码结尾的分号
    "prettier.semi": false,
    //  #使用单引号替代双引号
    "prettier.singleQuote": true,
    //  #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "files.associations": {
        ".env": "ignore",
        ".env.*": "ignore",
        "*.vue": "vue"
    },
    
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": false // 交给 eslint
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },

    // "[javascriptreact]": {
    //     "editor.formatOnSave": false // 交给 eslint
    // },
    "[vue]": {
        "editor.formatOnSave": true, // 交给 eslint
        //"editor.defaultFormatter": "octref.vetur"
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            // Prettier option here
            "trailingComma": "es5", // 多行时，尽可能打印尾随的逗号
            "tabWidth": 4, // 会忽略vetur的tabSize配置
            "useTabs": false, // 是否利用tab替代空格
            "semi": false, // 句尾是否加;
            "singleQuote": true, // 使用单引号而不是双引号
            "arrowParens": "avoid" // allow paren-less arrow functions 箭头函数的参数使用圆括号
        }
    },

    // #每次保存的时候自动格式化
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },

    "path-autocomplete.pathMappings": {
        "@": "${folder}/src",
        "~@": "${folder}/src"
    },
    "path-autocomplete.extensionOnImport": true,
    "vetur.validation.script": false,
    "vetur.format.options.tabSize": 4,
    "vetur.format.options.useTabs": false,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatter.js": "prettier",
    "[markdown]": {
        "editor.defaultFormatter": "mervin.markdown-formatter",
        "editor.formatOnSave": false
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

新建`.editorconfig`
```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## Git

:::tip
很重要！！！很重要！！！很重要！！！
:::


```bash
# 系统设置提交时转换为LF，检出时不转换
git config --global core.autocrlf input

```

### commit 格式
**.vcmrc**
格式 `type: subject` ，比如 `feat: 新增登录模块`

> 注意冒号后面有空格！注意冒号后面有空格！注意冒号后面有空格！

```javascript

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


## 项目规范

###  README
`README.md` 是项目的门面，须高度重视。

一定要说明以下几个事：
- 介绍项目的基本情况，功能以及主要的技术栈
- 项目调试/运行依赖的环境有什么
- 项目第一次从代码库拉下来必须要进行的配置文件在哪里
- 项目有哪几个环境，如何打包/运行
- 项目如何进行测试，一些账号信息等

> 参考 [[规范]-README模板](http://wiki.icinfo.co/pages/viewpage.action?pageId=18789595)


### 命名规范
- **语义化**：保证命名高度具有可读性，力争做到：见名知义；
- **参数、公有方法名**：统一小驼峰（camelCased）；
- **CSS 命名**：统一短横线&小写（kebab-case），更推荐使用类以提升效率；
- **文件名，文件夹**：统一短横线&小写（kebab-case）；
- **类名或公开对象**：统一大驼峰（CamelCased）；
- **私有字段或方法**：统一加 `_` 或者 `$` 前缀（_camelCasing）；
- **全局变量**：统一加上 g 前缀；Eg：gCoreVersion；
- **布尔类型值/方法**：统一以 is、can、 has 打头（同时优先遵循上一条）；
- **事件、方法回调**：分别以 on、handle 打头；
- **常量**：统一采用“全大写 + 下划线的方法命名”，Eg: EVENT_LIMITATION；
- 尽量避免使用缩写，除非是大众流行（application => app ✅ group => grp ❌）；
> 所有命名，除非是 for/forEach 内的 key(/item)，其他一律要使其该有的语义。

参考
- [[规范]-JavaScript命名](http://wiki.icinfo.co/pages/viewpage.action?pageId=18789589)
- [[规范]-CSS命名](http://wiki.icinfo.co/pages/viewpage.action?pageId=18789592)


### 目录说明
- 子系统组件以`my`开头(my-header)
- 系统组件以`base`开头(base-title)
- 所有的页面以文件目录作为名字(src/views/admin/role/list/index.vue-> 组件名`AdminRoleList`,页面样式`.admin-role-list`)
- 如果是业务或者基础组件，样式规范请使用[BEM规范](https://www.bemcss.com/)
```
src                               源码目录
  |-- api                              所有api接口
  |-- assets                           静态资源，images, icons, styles等
  |-- components                       公用组件
  |-- config                           配置信息
  |-- constants                        常量信息，项目所有Enum, 全局常量等
  |-- directives                       自定义指令
  |-- filters                          过滤器，全局工具
  |-- datas                            模拟数据，临时存放
  |-- lib                              外部引用的插件存放及修改文件
  |-- mock                             模拟接口，临时存放
  |-- plugins                          插件，全局使用
  |-- router                           路由，统一管理
  |-- store                            vuex, 统一管理
  |-- themes                           自定义样式主题
  |-- views                            视图目录
  |   |-- role                             role模块名
  |   |-- |-- index.vue                   
  |   |-- |-- index.less                      role模块样式
  |   |-- |-- components                      role模块通用组件文件夹
  |   |-- employee                         employee模块
```


参考
- [[规范]-Vue 项目规范](http://wiki.icinfo.co/pages/viewpage.action?pageId=18789583)

### 关于注释
- 公共函数必须有注释
- 组件props必须有注释

```
/**
 * 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @date 2021-03-11
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @returns {Boolean}
 */
export const hasOneOf = (target, arr) => {
    return target.some(_ => arr.indexOf(_) > -1);
};
```


## 代码规范

### JavaScript
- 启用 [eslint](https://eslint.org/) 
- 保证可读性、健壮性、可扩展性、可维护性；
- 尽可能拆分单一任务，于一个方法之中，使得代码更清晰，更易于复用；
- 推荐参考 [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)，争取写出更干净优雅的代码；

### CSS 
除了尽量使用类（最大限度上不要使用内联样式），准确而优雅的命名之外，请善用预处理工具，对各种 color、size、z-index 等常用的属性，统一定义变量，方便编写，更利于后期维护；同时，还有常用方法，如居中、去浮动、阴影特效等操作统一封装（mixin），提升编写、维护效率，也能缩减源码量；对于 CSS 预处理器，推荐使用 Less 或者 Stylus，而 Sass 会依赖 node-sass，而 node-sass 需要借助 Python 和 C++ 才能编译；跟环境耦合太重，很多时候，会出问题，但通过 `npm rebuild node-sass`命令，并不是所有时候都能解决问题

### HTML
推荐参考[编写一致、灵活和可持续的 HTML 和 CSS 代码的规范](https://codeguide.bootcss.com/)；

## 性能检查
每个项目有所区别，请阅读 [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist)、[Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) 所给出的建议，确保项目是采取更优的用法。

- Vue项目可以使用`vue-cli-service build --report`命名查看`report.html`，检查资源大小，固定的第三方依赖尽量以CDN方式引入
- 图片格式优先顺序 webp > jpg > png
- 服务器是否开启gzip压缩以及静态资源缓存


## 分支命名规范

### master 分支
- master 为主分支，也是线上分支，确保 master 分支稳定性；
- master 分支一般由 release 以及 hotfix 分支合并，任何时间都不能直接修改代码；

### develop 分支
- develop 为开发和提测分支，始终保持最新完成以及 bug修复后的代码；
- 一般开发的新功能时，feature 分支都是基于 develop 分支下创建的；

### feature 分支
- 开发新功能时，以 develop 为基础创建 feature 分支
- 分支命名: feature/ 开头的为特性分支， 命名规则: feature-v1.0.0-admin-role-mjh；

### release 分支
- release 为上线分支，发布阶段，会将develop合并到release 发布，完成后合并到master并打tag


### hotfix 分支
- 分支命名: hotfix/ 开头的为修复分支，它的命名规则与 feature 分支类似；
- 线上出现紧急问题时，需要及时修复，以 master 分支为基线，创建 hotfix 分支，修复完成后，需要合并到 master 分支和 develop 分支；



## 完备测试
参考[[规范]-前端自测](http://wiki.icinfo.co/pages/viewpage.action?pageId=18789602)


## 关于评审
参加评审的同学要做会议记录：
打开钉钉-》项目-》18前端项目-》 <月份>项目 -》任务名称

![](https://tva1.sinaimg.cn/large/008i3skNly1gtqtogwlvkj60ii0gymxv02.jpg)


任务列表（**指定负责人、截止时间、预计工时**）

- xxx版本评审（完成评审后请在评论里@负责人）
  一般的评审内容格式如下
  ```
  项目类型：老项目|前后端分离|小程序
  技术选型：vue|angualr|react|jquery|微信小程序|钉钉小程序
  技术难点：-
  页面总数：20（算弹窗）
  调研时间：2人/日
  静态页面：10人/日 = 20*0.5went
  联调时间：5人/日
  自测时间：1人/日（一般默认1）
  总时间：18人/日 = 2 + 10 + 5 + 1
  产品：-
  开发负责人：-
  UI：-
  交付经理：-
  提测时间：-
  上线时间：-
  里程碑地址：- 
  WBS地址：-
  UI地址：xxx(如果是本地的上传到附件)
  原型地址：xxx (如果是本地的上传到附件)
  
  ```


## 周报格式

```
本周任务
1、计划1 
预计完成进度：60%
实际完成进度：60%

2、计划2 
预计完成进度：60%
实际完成进度：40%
原因：如果有延期说明下原因

3、计划外的任务
完成情况


下周计划
1、计划1 
预计完成进度:100%

2、计划2 
预计完成进度:100%

3、x月x号xxxx项目提测或者上线
```




> 静态页面计算公式：页面*难度系数（0.5：vue-ts-template脚手架开发的；0.6:其他脚手架；1:图表；2：复杂场景）

> 联调工时计算公式：静态页面页面*0.5



