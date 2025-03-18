# MyTreeSelect 树形选择组件


MyTreeSelect 是一个基于 Vue 2.x 的树形选择组件，支持单选和多选模式，具有搜索、全选等功能。

## 功能特点

- 支持单选和多选模式
- 支持搜索过滤
- 支持全选功能
- 支持禁用状态
- 支持自定义数据字段映射
- 支持清空选项
- 支持展示选中项数量

## 依赖
- src/components/global/my-tree-select/index.vue
- src/scripts/utils/pinyin
- src/scripts/utils/html



## 使用示例

```vue
<template>
  <MyTreeSelect
    v-model="selectedItems"
    :data="treeData"
    :multiple="true"
    :disabled="false"
    placeholder="请选择"
    :is-show-select-all="true"
    :value-key="'id'"
    :label-key="'name'"
    :children-key="'children'"
  />
</template>

<script>

export default {
  components: {
    MyTreeSelect
  },
  data() {
    return {
      selectedItems: [],
      treeData: [
        {
          id: '1',
          name: '节点1',
          children: [
            {
              id: '1-1',
              name: '节点1-1'
            }
          ]
        }
      ]
    }
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value / v-model | 选中的值 | Array | [] |
| data | 展示数据 | Array | [] |
| multiple | 是否多选 | Boolean | true |
| disabled | 是否禁用 | Boolean | false |
| placeholder | 占位符 | String | '请选择' |
| isShowSelectAll | 是否显示全选 | Boolean | true |
| valueKey | 数据值的字段名 | String | 'value' |
| labelKey | 显示文本的字段名 | String | 'label' |
| childrenKey | 子节点的字段名 | String | 'children' |
| noFlat | 是否不需要展开（用于控制父子节点选择关系） | Boolean | false |

### 数据格式

#### 输入数据格式 (data)

```typescript
interface TreeNode {
  [valueKey]: string | number;  // 节点值
  [labelKey]: string;          // 节点标签
  [childrenKey]?: TreeNode[];  // 子节点
  disabled?: boolean;          // 是否禁用
  [key: string]: any;         // 其他自定义字段
}
```

示例：
```javascript
[
  {
    value: '1',
    label: '节点1',
    children: [
      {
        value: '1-1',
        label: '节点1-1'
      }
    ]
  }
]
```

#### value/v-model 的使用说明

组件的 value 支持两种传入方式：

1. 完整对象数组方式（推荐）：
```javascript
[
  {
    value: '1-1',
    label: '节点1-1',
    parent: {
      value: '1',
      label: '节点1'
    }
  }
]
```

2. 简单值数组方式：
```javascript
['1-1', '1-2']  // 仅包含 valueKey 值的数组
```

当使用简单值数组方式时，组件会自动从 data 中查找对应的完整节点信息，构建出完整的对象数组。这在只有 valueKey 值的场景下特别有用，比如：

```vue
<template>
  <MyTreeSelect
    v-model="selectedItems"
    :data="treeData"
    value-key="id"
    label-key="name"
  />
</template>

<script>
export default {
  data() {
    return {
      // 后端返回的选中值，通常是逗号分隔的字符串转换成数组
      selectedItems: ['1-1', '1-2'],  
      treeData: [
        {
          id: '1',
          name: '节点1',
          children: [
            {
              id: '1-1',
              name: '节点1-1'
            },
            {
              id: '1-2',
              name: '节点1-2'
            }
          ]
        }
      ]
    }
  }
}
</script>
```

#### 与后端交互示例

1. 保存数据时，可以将选中项的 valueKey 转换为逗号分隔的字符串：
```javascript
// 假设选中数据为：
const selectedData = [
  {
    value: '1-1',
    label: '节点1-1'
  },
  {
    value: '1-2',
    label: '节点1-2'
  }
];

// 转换为后端所需的格式
const valueString = selectedData.map(item => item.value).join(',');
// 结果: "1-1,1-2"
```

2. 回显数据时，将后端返回的逗号分隔字符串转换为数组传入组件：
```javascript
// 假设后端返回的数据为：
const backendData = "1-1,1-2";

// 转换为组件所需的格式
const selectedItems = backendData.split(',');
// 结果: ['1-1', '1-2']
```

组件会自动根据这些值从 data 中查找对应的完整节点信息。

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 选中值发生变化时触发 | (value: CheckedInfo[]) |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| clear | 清空选中项 | - |

## 注意事项

1. 组件内部会维护选中项的父节点信息，方便进行层级关系的展示和操作
2. 在多选模式下，如果选中父节点，默认会选中所有子节点
3. 搜索功能支持拼音搜索
4. 组件会自动处理数据重复的情况
5. 当设置 noFlat 为 true 时，父子节点的选择关系会保持独立

## 示例

### 基础用法
```vue
<MyTreeSelect v-model="value" :data="data" />
```

### 单选模式
```vue
<MyTreeSelect v-model="value" :data="data" :multiple="false" />
```

### 自定义字段名
```vue
<MyTreeSelect
  v-model="value"
  :data="data"
  value-key="id"
  label-key="name"
  children-key="subItems"
/>
```

### 禁用状态
```vue
<MyTreeSelect v-model="value" :data="data" disabled />
```
