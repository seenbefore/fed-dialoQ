## 区域机构树

### 基础属性

| 参数            | 说明             | 类型                                | 可选值 | 默认值 |
| --------------- | ---------------- | ----------------------------------- | ------ | ------ |
| value / v-model | 绑定值           | array                               | —      | -      |
| placeholder     | 输入框占位文本   | string                              | —      | -      |
| disabled        | 是否禁用         | boolean                             | —      | false  |
| clearable       | 是否可以清空选项 | boolean                             | —      | true   |
| leftTreeConfig  | 左侧树配置       | [LeftTreeConfig](#lefttreeconfig)   | -      | -      |
| rightTreeConfig | 右侧树配置       | [RightTreeConfig](#righttreeconfig) | -      | -      |
| searchConfig    | 搜索框配置       | [SeachConfig](#searchconfig)        | -      | -      |

### 方法

| 方法名称 | 说明 | 参数 |
| -------- | ---- | ---- |

### 事件

| 事件名称 | 说明           | 回调参数                 |
| -------- | -------------- | ------------------------ |
| change   | 选择机构时触发 | (selectedOrgs: Option[]) |

### LeftTreeConfig

| 参数             | 说明                 | 类型                                                                                   | 可选值 | 默认值 |
| ---------------- | -------------------- | -------------------------------------------------------------------------------------- | ------ | ------ |
| options          | 选项集合             | RegionOrgTreeOption[] / (() => RegionOrgTreeOption[] / Promise<RegionOrgTreeOption[]>) | -      | -      |
| isShowParentNode | 是否显示父级选中节点 | boolean                                                                                | -      | -      |
| optionFieldName  | 选项字段配置         | { label?: boolean; value?: boolean; children?: boolean }                               | -      | -      |

### RightTreeConfig

| 参数                | 说明             | 类型                                                             | 可选值 | 默认值 |
| ------------------- | ---------------- | ---------------------------------------------------------------- | ------ | ------ |
| options             | 选项集合         | (data) => RegionOrgTreeOption[] / Promise<RegionOrgTreeOption[]> | -      | -      |
| optionFieldName     | 选项字段配置     | { label?: boolean; value?: boolean; children?: boolean }         | -      | -      |
| renderOptionContent | 选项内容渲染函数 |                                                                  | -      | -      |

### SeachConfig

| 参数                | 说明             | 类型                                                             | 可选值 | 默认值                        |
| ------------------- | ---------------- | ---------------------------------------------------------------- | ------ | ----------------------------- |
| options             | 选项集合         | (data) => RegionOrgTreeOption[] / Promise<RegionOrgTreeOption[]> | -      | 默认使用rightTreeConfig的配置 |
| optionFieldName     | 选项字段配置     | { label?: boolean; value?: boolean; children?: boolean }         | -      | 默认使用rightTreeConfig的配置 |
| renderOptionContent | 选项内容渲染函数 |                                                                  | -      | 默认使用rightTreeConfig的配置 |
