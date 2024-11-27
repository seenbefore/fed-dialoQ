# H5移动端应用

## 组件
- 案例：`/readme`

## 路由
- 模式：默认`hash`。`settings.js`中配置`mode`。
- 页面缓存：`router.js`文件中，`meta`属性中`noCache`为`true`时页面不缓存,`false`时默认缓存页面，可以通过`this.$back()`强行重载页面。

举例说明缓存开启时(`noCache: false`)，页面刷新情况，有如下页面：首页A、地址列表B、地址详情C
- 从A到B，B自动刷新
- 从C回退到B，B不刷新
- C更新了内容，返回到B需要刷新，可使用`this.$back(true)`，B页面会重新加载。
- C更新了内容，返回到B需要刷新，B页面中`activated`中实现加载数据逻辑，默认使用`this.$router.go(-1)`即可。

## 业务模块

### 首页
- 替换`views/index/router.js`中的`redirect`即可

### 考试管理
- 实名认证：路由地址`/exam/auth`
- 考试题库：路由地址`/exam/question`
- 考试列表：考试列表查看、参加考试、查看考试结果等操作。路由地址`/exam/list`
- 考试详情：提供在线考试相关功能。路由地址`/exam/detail/:examId`
- 考试结果：提供在线考试相关功能，包括考试结果查看、得分和解析等操作。路由地址`/exam/result/:examId`

### 执法管理
- 审核同意：路由地址`/enforcement/approve`
- 继续处置：路由地址`/enforcement/continue`
- 执法反馈：路由地址`/enforcement/feedback`
- 执法处置：路由地址`/enforcement/handle`
- 重新选派部门：路由地址`/enforcement/reassign`
- 执法退回：路由地址`/enforcement/reject`
