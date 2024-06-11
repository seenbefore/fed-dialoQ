
## 环境准备

### 开通账号
- 开通公司邮箱，下载foxmail配置邮箱，[地址](http://mail.icinfo.com.cn/extmail/cgi/index.cgi)
- 开通git账号，[地址](http://gitlab.icinfo.co/)
- 开通jira账号，[地址](http://jira.icinfo.co/)
- [wiki-前端地址](http://wiki.icinfo.co/pages/viewpage.action?pageId=10323301)

:::tip
请先配置[SSH Keys](http://gitlab.icinfo.co/profile/keys)
:::

### git配置
**很重要！！！很重要！！！很重要！！！**


```bash
# 系统设置提交时转换为LF，检出时不转换
git config --global core.autocrlf input

```

### 必备软件
|   名称   | 版本  |  备注  |
| --- |--- |--- |
| node | ~14.18.1 | [下载](http://nodejs.cn/download/) |
| nginx  | 1.18+ | [下载](http://nginx.org/en/download.html) |
| vscode  | lastest | [下载](https://code.visualstudio.com/) |
| git  | lastest | [下载](https://git-scm.com/downloads)  |
| foxmail  | lastest | [下载](https://www.foxmail.com/) |

#### VSCode

- 必要插件
  - `ESLint`
  - `Vetur`
  - `Prettier - Code formatter`
  - `path Autocomplete` 地址补全
  - `Markdown Preview Enhanced` Markdown预览
- 推荐插件
  - `stylelint`
  - `vscode-element-helper` (element-ui 专用)
  - `Debugger for Chrome` 
  - `GitLens -- Git supercharged`
   

#### Chrome     
- 必要插件
  - `vue-devtools`
- 推荐插件
  - `json-formatter`



### 任务拆分和评估
前端最小拆分时间颗粒度为 0.5 天，最长的不要超过3天，尽可能的将一个迭代任务细分。任务拆分需要参考 Code Review 节点。例如一个重要的功能函数，可以拆分为一个单独的任务，这个单独的任务也可以是一个 Code Review 节点。这样的任务拆分更有利于 Code Review 落实

任务列表（**指定负责人、截止时间、预计工时**）
```
开发时间 = UI还原时间 +  联调
总时间 = UI还原时间 +  联调 + 自测时间

公式：
UI还原时间 = 页面总数 * 0.5 （一般情况默认难度系数0.5,个别复杂页面可以设置为1、2等）
联调 = UI还原时间 * 0.25
自测时间 = 开发时间(UI还原时间+联调) * 0.1

比如项目页面总数20，总时间 = 20*0.5*1.25*1.1 = 13.75天 （向上取整14）
```
![](https://tva1.sinaimg.cn/large/008i3skNly1gwp3as6kgnj31fi0re40w.jpg)





## 分支管理


### 环境

| 简称 | 全称 |
| --- | ---  |
| DEV | Development environment  |
| FAT | Feature Acceptance Test environment  |
| UAT | User Acceptance Test environment  |
| PRO | Production environment  |

- DEV 环境：用于开发者调试使用。
- FAT 环境：功能验收测试环境，用于测试环境下的软件测试者测试使用。
- UAT 环境：用户验收测试环境，用于生产环境下的软件测试者测试使用。
- PRO 环境：就是生产环境。
比如，项目域名为：http://www.abc.com，那么相关环境的域名可这样配置：
- DEV 环境：本地配置虚拟域名即可
- FAT 环境：http://fat.abc.com
- UAT 环境：http://uat.abc.com
- PRO 环境：http://www.abc.com
接下来，针对不同的环境来设计分支。


### 分支

| 简称 | 全称 | 环境 | 
| --- | ---  |---  |
| master | 主分支  | PRO |
| release | 预上线分支  | UAT |
| hotfix | 紧急修复分支  | DEV |
| develop | 测试分支  | FAT |
| feature | 需求开发分支  | DEV |

**master 分支**
master 为主分支，用于部署到正式环境（PRO），一般由 release 或 hotfix  分支合并，任何情况下不允许直接在 master 分支上修改代码。

**release 分支**
release 为预上线分支，用于部署到预上线环境（UAT），始终保持与 master 分支一致，一般由 develop 或 hotfix 分支合并，不建议直接在 release 分支上直接修改代码。
如果在 release 分支测试出问题，需要回归验证 develop 分支看否存在此问题。

**hotfix 分支**
hotfix 为紧急修复分支，命名规则为 hotfix- 开头。
当线上出现紧急问题需要马上修复时，需要基于 release 或 master 分支创建 hotfix 分支，修复完成后，再合并到 release 或 develop 分支，一旦修复上线，便将其删除。

**develop 分支**
develop 为测试分支，用于部署到测试环境（FAT），始终保持最新完成以及 bug 修复后的代码，可根据需求大小程度确定是由 feature 分支合并，还是直接在上面开发。
一定是满足测试的代码才能往上面合并或提交。

**feature 分支**
feature 为需求开发分支，命名规则为 feature- 开头，一旦该需求上线，便将其删除。




### Commit 日志规范
**提交信息一定要认真填写！**

建议参考规范 `<type>: [scope]<subject>` 

比如 `feat: 登录模块-完成静态页面`、`fix: 首页模块-修复弹窗 JS Bug`

> 注意冒号后面有空格！注意冒号后面有空格！注意冒号后面有空格！

**type** 表示 动作类型，可分为：
- fix：修复 xxx Bug
- feat：新增 xxx 功能
- style：变更 xxx 代码格式或注释
- docs：变更 xxx 文档
- refactor：重构 xxx 功能或方法

**scope** 表示 影响范围，可分为：模块、类库、方法等。
**subject** 表示 简短描述，最好不要超过 60 个字，如果有相关 Bug 的 Jira 号，建议在描述中加上。





### 部署

#### 蜻蜓云效

地址：http://192.168.1.147:3001/admin/devops/pipeline

### 提测
- UI走查
- 产品体验
- 正式提测

## 项目跟踪

### 站会
每周一小组就当前进度和风险进行内部讨论

### 周报

**模板**
```

本周任务
1、xxx模块静态页面
预计完成进度：60%
实际完成进度：60%

2、xxx模块填联调
预计完成进度：60%
实际完成进度：40%
原因：后端API文档延误

3、计划外的任务
完成情况


下周计划
1、计划1 
预计完成进度:100%

2、计划2 
预计完成进度:100%

3、x月x号xxxx项目提测或者上线
```

> 项目负责人需要统计延期的任务和原因


## 常见问题

### 独立负责项目
- 按时交付并且保证质量
- 独立攻关项目中的核心业务问题
- 准确评估项目进度和风险
- 把控项目其他成员的进度和质量
- 独立负责项目的发布部署(蜻蜓发布、nginx配置)
- 独立解决项目的性能问题
- 和外部团队保持顺畅沟通（产品、UI、后端等）
- 熟练掌握内部工具：后台模板
- 熟练掌握必备技能：vue2、TypeScript
- 严格执行公司的流程规范

### 职级
- **助理**：独立完成单独页面开发，参与项目流程； 了解主流前端框架；具备一定的问题发现、分析和定位能力
- **初级**：实现HTML页面和交互效果，完成简单组件开发，并有效利用主流前端框架完成页面开发； 主动思考模块的缺陷，并提出有效改进方法； 能及时总结工作经验、分享技术心得，协助他人有效完成完成工作
- **中级**：独立完成需求解决方案，对前端主流框架，及构建工具有深入研究； 参与组件或类库的编写，实现前端架构搭建； 能够撰写项目流程及技术文档，并有效指导他人工作
- **高级**：设计前端架构，保障项目进度和质量，能够负责前端代码审核和规范制定； 能够思维突破常规的、传统的思维模式的限制，提出具备可行性的新方案，并带领团队有序高效践行
- **资深**：能够负责全站或核心业务的前端架构设计和开发； 前端研发技术的评估、落地和可视化展现；推动工程化建设； 基于业务和前端技术的进行产品创新、预测风险，协同或领导小团队在业务方向上进行持续性实验



