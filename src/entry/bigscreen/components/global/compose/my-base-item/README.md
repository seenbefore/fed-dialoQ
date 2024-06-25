# my-base-item

my-badge + my-text-item

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| isAutoTranData  | 是否组件中自动转换数据  | Boolean    | false   |
| item  | 组件的配置项  | BaseItem    | -    |
| resData  | 接口数据  | Array/Object    | -    |
| isResDataType  | 接口数据类型  | 'array/object'    |  'array'   |
| fieldConfig  | 接口数组对象的key-value字段配置项，isResDataType为array并且，resData类型为Array的时候生效  | Object    |  { key: 'itemCode', valueKey: 'itemValue' }   |
| customFormatResData  | 自定义格式化接口数据函数  | Function    |  -   |

### BaseItem - attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| icon  | 图标名称  | String    | -   |
| class  | css类名  | String    | -   |
| options  | 配置项  | BaseItemOption    | -   |

### BaseItemOption - attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| layout  | 布局类型  | 'column/row'    | row   |
| class  | css类名  | String    | -   |
| style  | 样式  | Object    | -   |
| attrs  | my-text-item配置项，参考my-text-item组件  | TextItem    | -   |

### 注意

```bash

# 图标文件的路径，根据当前的项目路径进行修改
@bigScreen/assets/base-svg/

```

### 示例

```bash

相关示例代码xxx

```
