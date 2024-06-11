### 适用业务场景

* 表格和列表类的元素较多
* 需要生成的pdf样式和前端页面样式基本相同

### 基础属性

| 参数 | 说明 | 类型 | 默认值 |
| :-: | :-: | :-: | :-: |
| container | 渲染容器dom | HtmlElement |  |
| width | Pdf页面宽度 | Number | 1170 |
| height | Pdf页面高度 | Number | 1170 * 1.414 |
| options | 配置项：配置表格类名映射、固定元素显示等 | Arrary[Object] |  |
| grid | 每页网格边距 | Object | {  top: 20, left: 20, right: 20, bottom: 20, } |
| output | 输出格式 | String | blob |
| save | 是否自动保存文件 | Boolean | false |
| fileName | 文件名称 | String |  |
| debug | 是否开启调试模式，开启后保留打印dom | Boolean | false |
| isConsole | 是否打印信息 | Boolean | false |

### 使用方法

``` 
需要简单理解一下实现原理：
➡️ 新建画布html容器（用来html2canvas转换图片）
➡️ 拷贝页面dom节点到画布
➡️ 计算画布上拷贝出来的dom尺寸
➡️ 分析是否增加页码展示等等
```
从以上过程中可以看出，想要提供准确计算参数的话，需要对html的dom进行标记并且是批量处理，这里我们选择用html class来进行标记，所以需要定义工具专属的类名。

| class常量名 | 定义 | 备注 |
| :-: | :-: | :-: |
| HTML2PDF_CLASS_NAME_BASIC | 基本元素 | 需要打印的元素必须设置，定义dom的parentNode元素必须为container |
| HTML2PDF_CLASS_NAME_FXIED | 悬浮固定元素 | 适用于页面固定元素（比如签章等），需要对齐定位和页码进行设置的话，可以在options中配置，比如{"type":"fixed","includes":[dom专属类名],"pagination":[页码],"styles":{"top":"30px","right":"30px"}} |
| HTML2PDF_CLASS_NAME_TABLE | 表格元素 | 核心类名，实现列表分页的容器 |
| HTML2PDF_CLASS_NAME_LIST_HEAD | 表头元素 | 列表的表头元素，如果没有表头可以不设置 |
| HTML2PDF_CLASS_NAME_LIST_ROW | 表行元素 | 列表的行元素，根据表行计算尺寸进行pdf分页等操作 |
| HTML2PDF_CLASS_NAME_LIST_COLLECTION | 列表集合元素 | 当container容器内子元素存在多个子表格的情况下，需要对子元素进行定义 |
| HTML2PDF_CLASS_NAME_LIST_ROW_GROUP | 表行组元素 | 有的表格行左侧会有其它元素，这时候虽然表行数据为空，但是左侧元素依然会显示，所以需要在其外部设置表行组，表格数据为空的时候删除整个组 |
| HTML2PDF_CLASS_NAME_LIST_ROW_IN_GROUP | 表行组内元素 | 因为进行dom解析的时候，最先对表行进行解析，所以需要确定表行是否处于表行组中，向上寻找表行组元素 |

### 注意事项
* 基于html元素计算生成，所以屏幕分辨率和窗口宽高对生成结果都有影响，需要注意测试
* 目前未支持对文本类元素自动分页