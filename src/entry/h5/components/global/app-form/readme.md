## 移动端信息录入表单app-form

### 基础属性

| 参数            | 说明                 | 类型                 | 可选值       | 默认值 |
| --------------- | -------------------- | -------------------- | ------------ | ------ |
| value / v-model | 绑定值               | object               | —            | -      |
| fields          | 列配置               | [GroupField]/[Field] | -            | -      |
| showFootBtns    | 底部按钮显隐         | boolean              | -            | true   |
| disabled        | 全局禁用             | boolean              | —            | false  |
| forceSameSet    | 强制设成一个分组     | boolean              | —            | false  |
| httpRequest     | 自定义 http          | Function             | -          | -      |
| extraParams     | 自定义函数里额外参数 | object               | —            | -      |

### 方法

| 方法名称             | 说明                                       | 参数                                                  |
| -------------------- | ------------------------------------------ | ----------------------------------------------------- |
| getRefField          | 获取对应组件的实例                         | Function(name: string)，name 为表单 key 键值          |
| getFieldAttrs        | 获取对应表单组件实例属性                   | Function(name: string)                                |
| setFieldAttrs        | 重设对应表单组件属性                       | Function(name: string, fieldName: string, value: any) |
| resetVlidateFormItem | 重置表单项的验证提示                       | Function(name?: string / string[])，name 非必传       |
| scrollToFormAnchor   | 滚动到对应表单项的位置                     | Function(name: string)                                |
| validate             | 表单校验,返回一个 promise, .then()校验成功 | -                                                     |
| submit               | 表单自带校验成功提交按钮                   | -                                                     |
| cancel               | 表单自带取消按钮                           | -                                                     |

### GroupField

| 参数      | 说明           | 类型    | 可选值 | 默认值 |
| --------- | -------------- | ------- | ------ | ------ |
| groupName | 分组名         | string  | -      | -      |
| groupId   | 分组 Id        | string  | -      | -      |
| children  | 分组表单项集合 | [Field] | -      | []     |

### Field

| 参数        | 说明               | 类型    | 可选值                                                                              | 默认值   |
| ----------- | ------------------ | ------- | -------------------------------------------------------------------------------- | -------- |
| groupName   | 分组名             | string  | -                                                                                          | 不是必须 |
| groupId     | 分组 Id            | string  | -                                                                                          | 不是必须 |
| tag         | 组件类型           | string  | [text/input/radio/checkbox/cascader/uploader/number-input/date-picker/select-picker/table] | -        |
| name        | 提交表单键值 key   | string  | -                                                                                          | -        |
| label       | 输入框左侧文本     | string  | -                                                                                          | -        |
| hiddenLabel | 隐藏输入框左侧文本 | boolean | -                                                                                          | -        |
| required | 是否必填              | boolean | -                                         | false        |
| defaultValue | 初始默认值 | any | -                                                                                          | -        |
| props | 各组件其余配置参数 | Record<string, any> | -                                    |-   |
| on | 各组件自定义映射事件集合 | Record<string, any> | -                                     | -        |
| rules | 校验规则 | any[] | -                                     | -        |
| sort | 排序 | Record<string, any> | -                                     | -        |
| hidden | 隐藏本项 | Record<string, any> | -                                     | -        |
| slotName | 自定义组件插槽类名 | string | -                                     | -        |
| ifRender | 动态渲染表单控制 | Function | -                                     | -        |
| LinkageWatcher | 联动规则 |[LinkageWatcher] | -                                     | -        |

### TableFormColumn.props

| 参数    | 说明                                  | 类型 | 可选值 | 默认值 |
| ------- | ------------------------------------- | ---- | ------ | ------ |
| value   | 初始值                                | -    | -      | -      |
| options | select/checkbox/radio/cascader 数据源 | -    | -      | -      |
| 其他    | 参考对应 element 组件的属性           | -    | -      | -      |

### LinkageWatcher

| 参数    | 说明                                | 类型                                    | 可选值 | 默认值 |
| ------- | ----------------------------------- | --------------------------------------- | ------ | ------ |
| watch   | 监听的值                            | string[]                                | -      | -      |
| handler | 监听的值变化后的操作函数            | (values: any) => Promise                | -      | -      |
| options | deep: 深度监听; immediate: 立即监听 | { deep?: boolean; immediate?: boolean } | -      | -      |

### 使用示例

#### 1. 基础表单示例

```vue
<template>
  <app-form
    ref="formRef"
    v-model="formData"
    :fields="formFields"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formFields: [
        // 文本展示
        {
          tag: 'text',
          name: 'displayText',
          label: '文本展示',
          props: { value: '这是一段展示文本' }
        },
        // 输入框
        {
          tag: 'input',
          name: 'username',
          label: '用户名',
          required: true,
          props: {
            placeholder: '请输入用户名',
            maxlength: 20
          },
          rules: [
            { required: true, message: '请输入用户名' }
          ]
        },
        // 单选框
        {
          tag: 'radio',
          name: 'gender',
          label: '性别',
          props: {
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 }
            ]
          }
        }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$refs.formRef.validate()
        console.log('表单数据:', this.formData)
      } catch (error) {
        console.error('表单验证失败:', error)
      }
    },
    handleCancel() {
      this.formData = {}
    }
  }
}
</script>
```

#### 2. 分组表单示例

```vue
<template>
  <app-form
    ref="formRef"
    v-model="formData"
    :fields="groupFields"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      groupFields: [
        {
          groupName: '基本信息',
          groupId: 'basic',
          children: [
            {
              tag: 'input',
              name: 'name',
              label: '姓名',
              required: true
            },
            {
              tag: 'input',
              name: 'phone',
              label: '电话',
              required: true
            }
          ]
        },
        {
          groupName: '详细信息',
          groupId: 'detail',
          children: [
            {
              tag: 'input',
              name: 'address',
              label: '地址'
            }
          ]
        }
      ]
    }
  }
}
</script>
```

#### 3. 表单联动示例

```vue
<template>
  <app-form
    ref="formRef"
    v-model="formData"
    :fields="linkageFields"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      linkageFields: [
        {
          tag: 'select-picker',
          name: 'province',
          label: '省份',
          props: {
            options: [
              { label: '广东省', value: 'guangdong' },
              { label: '浙江省', value: 'zhejiang' }
            ]
          }
        },
        {
          tag: 'select-picker',
          name: 'city',
          label: '城市',
          props: { options: [] },
          LinkageWatcher: [
            {
              watch: ['province'],
              handler: async (values) => {
                // 根据省份获取城市列表
                const cityOptions = await this.getCityOptions(values.province)
                return {
                  props: { options: cityOptions }
                }
              },
              options: { immediate: true }
            }
          ]
        }
      ]
    }
  },
  methods: {
    async getCityOptions(province) {
      // 模拟获取城市数据
      const cityMap = {
        guangdong: [
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' }
        ],
        zhejiang: [
          { label: '杭州', value: 'hangzhou' },
          { label: '宁波', value: 'ningbo' }
        ]
      }
      return cityMap[province] || []
    }
  }
}
</script>
```

### 常见场景说明

1. **基础表单**
   - 支持多种表单控件：text、input、radio、checkbox等
   - 可配置验证规则
   - 提供提交和取消事件处理

2. **分组表单**
   - 通过groupName和groupId进行分组
   - 每个分组可包含多个表单项
   - 支持分组的显示/隐藏控制

3. **表单联动**
   - 使用LinkageWatcher配置联动规则
   - 支持监听多个字段变化
   - 可异步获取联动数据
   - 支持immediate立即触发和deep深度监听

4. **常用配置说明**
   - required: 必填项配置
   - rules: 验证规则配置
   - props: 组件属性配置
   - on: 事件监听配置
   - hidden: 显隐控制
   - slotName: 自定义插槽
