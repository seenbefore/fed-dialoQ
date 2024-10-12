# 说明
__该文件夹下的代码不可擅自更改，否则会导致模板更新/生成等功能执行失败！__

`core` 文件夹下为模板的更新，模板生成。

## 更新日志

### 1.0.5
- 修复了 `windows` 下无法通过远端拉取 `tar` 文件并且解压的问题。增加平台判断，`windows` 平台启用 `zip` 下载。


### 1.0.6
- 修复了 基础的`store` 继承过来之后无法增加新的属性。

### 1.0.7
- 增加了脚本 `gen:page [routerPath] [title] [insertToViews]`，用于生成列表页面。
```shell
# 默认生成到 src/views 下
npm run gen:page test-page 测试页面

# 想要生成在当前执行脚本的目录下
npm run gen:page test-page 测试页面 false
```
