# H5移动端应用



## 功能模块说明

## 首页
- 替换`views/index/router.js`中的`redirect`即可，默认指向了`/readme`

### 考试管理
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
