## 行内输入框

### 基础属性

| 参数            | 说明                                                                              | 类型          | 可选值       | 默认值   |
| --------------- | --------------------------------------------------------------------------------- | ------------- | ------------ | -------- |
| type            | 类型                                                                              | string        | text, number | text     |
| value / v-model | 绑定值                                                                            | string/number | —            | -        |
| placeholder     | 输入框占位文本                                                                    | string        | —            | -        |
| readonly        | 是否只读                                                                          | boolean       | —            | false    |
| disabled        | 是否禁用                                                                          | boolean       | —            | false    |
| maxLength       | 最大长度                                                                          | number        | —            | Infinity |
| defaultLength   | 默认长度(默认长度为零时，取最大长度最为默认长度。若最大长度为无穷，则默认长度为0) | number        | —            | 0        |
| allowNewline    | 允许换行                                                                          | boolean       | —            | false    |
| notUnderline    | 无下划线                                                                          | boolean       | —            | false    |
| decimals        | 保留几位小数，仅type为number时生效                                                | number        | —            | 0        |

### 事件

| 事件名称 | 说明           | 回调参数       |
| -------- | -------------- | -------------- |
| blur     | 失去焦点时触发 | (event: Event) |
| focus    | 获得焦点时触发 | (event: Event) |
| input    | 值改变时触发   | (value: string | number) |
