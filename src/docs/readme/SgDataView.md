## 动态表格

集成分页

### 基础属性

| 参数          | 说明               | 类型     | 可选值 | 默认值 |
| ------------- | ------------------ | -------- | ------ | ------ |
| defaultValue  | 默认值             |          | —      | -      |
| columns       | 列配置             | Array    | —      | -      |
| auto          | 第一次是否自动请求 | Boolean  | —      | true   |
| pagination    | 页面配置 ,参考element-ui         | Object   | —      |  `{page: 1, pageSize: 10, pageSizes: [10, 20, 50, 100, 200]}`      |
| load          | 数据请求返回一个`Promise`,成功后`resolve({result:[],total:1000}) `          | Function |        |    result为数据集,total为总数    |
| paramsSerializer  | 返回新的页码参数对象           | Function({page,pageSize,size}) |        |        |
| multipleSelectionAll       | 跨页初始数据             | Array    | —      | -      |
| idKey       | 跨页匹配字段             | String    | —      | -      |




### 方法

| 事件名称 | 说明         | 回调参数 |
| -------- | ------------ | -------- |
| onLoad   | 重新获取数据 | {page:1,pageSize} ,不传则表示当前页|

### 事件
参考 element table

| 事件名称 | 说明 | 回调参数 |
| -------- | ---- | -------- |
| selection-change-all | 跨页勾选变化 | 勾选的数组 |



### 列属性

| 参数     | 说明       | 类型 | 可选值 | 默认值 |
| -------- | ---------- | ---- | ------ | ------ |
| label    | 表头名称   |      | —      | -      |
| prop     | 表头 key   |      | —      | -      |
| width    | 宽度 150px |      | —      | -      |
| minWidth    | 最小宽度：推荐使用 |      | —      | -      |
| render   | 自定义渲染 |      | —      | -      |
| slotName | 插槽区域   |      | —      | -      |