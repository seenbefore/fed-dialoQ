## 为什么要分支管理

分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了 50% 的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。



## 分支模型

![](https://tva1.sinaimg.cn/large/008i3skNly1gvemwt575uj61160m6jsr02.jpg)

-   master：最为稳定功能比较完整的随时可发布的代码，即代码开发完成上线后，才能合并到`master`中。不可直接提交。
-   develop：用作平时开发的主分支，并一直存在，永远是功能最新最全的分支，包含所有要发布 到下一个 release 的代码，主要用于合并其他分支，比如 `feature` 分支
-   feature：这个分支主要是用来开发新的功能，一旦开发完成，通过测试后，我们合并回 develop 分支进入下一个 release
-   release: 用于发布准备的专门分支。当开发进行到一定程度，或者说快到了既定的发布日，可以发布时，建立一个 release 分支并指定版本号。上线后将合并到`master`以及`develop`
-   hotfix: 用于修复线上代码的 bug。从 `master` 分支上拉。完成 `hotfix` 后，打上 `tag` 我们合并回 master 和 develop 分支

一般情况：

-   所有开发分支从 develop 分支拉
-   所有 hotfix 分支从 master 拉
-   所有在 master 上的提交都必要要有 tag，方便回滚
-   只要有合并到 master 分支的操作，都需要和 develop 分支合并下，保证同步
-   master 和 develop 分支是主要分支，主要分支每种类型只能有一个，派生分支每个类型可以同时存 在多个。

## commit规范
在多人协作项目中，如果代码风格统一、代码提交信息的说明准确，那么在后期协作以及 Bug 处理时会更加方便。

```
<type>: <subject>
```
> 注意冒号后面有空格

#### type

`type`代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下

|   参数   |             类型             |
| :------: | :--------------------------: |
|   feat   |      新功能（feature）       |
|   fix    |           修补 bug           |
|   docs   |    文档（documentation）     |
|  style   | 格式（不影响代码运行的变动） |
| refactor |             重构             |
|   test   |           增加测试           |
|  revert  |             回滚             |
|  config  |   构建过程或辅助工具的变动   |
|  perf    |   代码优化   |
|  chore   |           其他改动           |

> 如果 type 为 feat 和 fix，则该 commit 将肯定出现在 Change log 之中。

#### subject

subject 是 commit 目的的简短描述，不超过 50 个字符，且结尾不加句号（.）。


## 场景

一般每次迭代都会指定一个版本号,比如 `1.0.0`

### 开始新 feature 开发

> 命名： feature-<版本号>-[功能]-<开发者名字> 比如 **feature-1.0.0-login-mjh** 或者 **feature-1.0.0-mjh** 

```bash
# 下载代码
git clone xxxxx
# 查看远程分支
git branch -r
# 创建新的功能分支
git checkout -b feature-1.0.0-login-mjh origin/develop
# 开发
git add .
git commit -m "feat: 完成xxx"
# 推送到远程
git push origin feature-1.0.0-login-mjh
```

> 合并远程 develop 分支内容，先保证代码已提交

```bash
# 方案一 直接拉取远程分支 ，如果远程分支是与当前分支合并，则冒号后面的部分可以省略
git fetch -p
git pull origin develop:feature-1-0-0-login

# 方案二 本地合并 如果本地有develop
git fetch -p
git merge develop --no-ff -m 'perf: 合并develop'

# 推荐方案三 rebase
git fetch -p
git rebase develop

# 如果冲突想要回退
git reset --hard HEAD~1


```

### 修复线上代码

```bash
# 保存临时代码
git add .
git stash
# 拉取远程代码
git fetch -p
# 创建修复分支
git checkout -b hotfix-1-0-0-login-mjh origin/master
git add .
git commit -m 'fix: xxxxx'
git push origin hotfix-1-0-0-login-mjh

```