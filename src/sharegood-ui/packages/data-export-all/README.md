## 纯前端导出全部数据
---------------------------------------

#### 引入方式
- 第一步： 若在自己项目内未更改sharegood-ui内的代码，则可以全量覆盖sharegood-ui文件夹，若有改动，则参考 [该提交](http://gitlab.icinfo.co/fed/vue-template-admin/-/merge_requests/74/diffs?commit_id=efb09652d6ef95beb69281f25e32e17e83134f5a) 引入
- 第二步： 执行 `npm install --save xlsx-style-medalsoft`
- 第三步： [优化包引入方式](http://gitlab.icinfo.co/fed/vue-template-admin/-/merge_requests/78)


#### 使用方式

  前置条件: ***列表开启分页并且 `pagination.layout` 配置中包含 slot***

- 方式一：通过`sg-table-view`组件传入对应的参数，在分页器中会展示 `导出全部` 按钮
- 方式二：通过获取`sg-table-view`组件实例，直接调用 `exportAll` 方法
```
// 方式一
:pageActionLayout=[{
    key: 'exportAll',
    label: '导出全部',
}]
// 方式二
this.$refs.tableRef.exportAll()
```

#### 参数配置

`sg-table-view` 组件新增 `exportAllConfig` 参数，类型为`Object`：

|  字段名   | 类型  |  默认值   | 是否必传  | 备注  |
|  ----  | ----  |  ----  | ----  | ----  |
| name  | string |  `sg-table-view`中的exportName 或 'data'  | 否  | 导出文件名称  |
| label  | string |  '导出全部'  | 否  | 按钮文案  |
| maxNum  | number |  100000  | 否  | 支持导出的最大数量  |
| splitReqNum  | number |  1000  | 否  | 每次轮询的条数  |
| defaultValue  | string |  ''  | 否  | 表格渲染的默认值  |
| concurrencyRequestsNum  | number |  5  | 否  | 并发请求数量  |
| load  | ({ pageNum, pageSize, start }) => { result: any[], total: number } |  `sg-table-view`中的load  | 否  | 轮询的函数方法  |

注：若原传入`sg-table-view`中的load内部没有写其他业务代码，则可以不传复用。

`sg-table-view` 组件 columns 参数中的每个对象新增属性

|  字段名   | 类型  |  默认值   | 是否必传  | 备注  |
|  ----  | ----  |  ----  | ----  | ----  |
| noExport  | boolean |  false  | 否  | 字段是否导出，默认false导出  |
| exportRender  | Function(row, index) |  null  | 否  | 导出的值，默认直接渲染接口返回的内容  |