# DraggableTable 可拖拽排序表格组件

## 组件说明

DraggableTable 是一个基于 Element UI Table 封装的可拖拽排序表格组件。支持行拖拽排序、自定义列配置等功能。

## Props 属性说明

| 参数       | 说明                 | 类型          | 可选值     | 默认值 |
| ---------- | -------------------- | ------------- | ---------- | ------ |
| data       | 表格数据             | Array         | -          | []     |
| columns    | 表格列配置           | Array         | -          | []     |
| actions    | 表格操作列配置       | Array         | -          | []     |
| maxHeight  | 表格最大高度         | String/Number | -          | -      |

### columns 列配置项说明

| 参数     | 说明               | 类型           | 可选值            | 默认值 |
| -------- | ------------------ | -------------- | ----------------- | ------ |
| prop     | 列字段名称         | String         | -                 | -      |
| label    | 列标题             | String         | -                 | -      |
| width    | 列宽度             | String/Number  | -                 | -      |
| minWidth | 最小列宽度         | String/Number  | -                 | -      |
| align    | 对齐方式           | String         | left/center/right | left   |

### actions 操作列配置项说明

| 参数     | 说明               | 类型           | 可选值            | 默认值 |
| -------- | ------------------ | -------------- | ----------------- | ------ |
| key      | 操作项唯一标识     | String         | -                 | -      |
| icon     | 操作项图标         | String         | -                 | -      |
| label    | 操作项标题         | String         | -                 | -      |
| handler  | 操作项点击事件回调 | Function       | -                 | -      |
| tooltip  | 操作项提示         | String         | -                 | -      |

## Events 事件

| 事件名           | 说明               | 回调参数                      |
| ---------------- | ------------------ | ----------------------------- |
| drag-end         | 拖拽排序完成时触发 | (newData: Array) 排序后的数据 |
| row-click        | 行点击事件         | (row, column, event)          |
| selection-change | 多选时选中项变化   | (selection: Array) 选中项数组 |

## Slots 插槽

| 插槽名        | 说明                             | 作用域参数               |
| ------------- | -------------------------------- | ------------------------ |
| -             | 默认插槽，用于自定义整个表格内容 | -                        |
| [column.prop] | 列数据的自定义插槽               | { row, column, \$index } |

## 使用注意事项

1. 使用拖拽功能时，需要确保数据中有唯一标识字段(默认为'id')
2. 自定义列插槽需要在 columns 配置中设置 slot: true
3. 表格高度设置为固定值时可能会影响拖拽效果，建议使用 maxHeight
4. 不支持树形数据的拖拽排序

## 示例代码

```vue
<template>
    <draggable-table :data="tableData" :columns="columns" @drag-end="handleDragEnd">
       
    </draggable-table>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                { id: 1, name: '张三', age: 18 },
                { id: 2, name: '李四', age: 20 },
            ],
            columns: [
                { prop: 'sort', label: '序号', width: '50px' },
                { prop: 'name', label: '名称', minWidth: '200px' },
                {
                    prop: 'attachments',
                    label: '含附件',
                    width: '100px',
                    render: (h, { row }) => {
                        return <el-checkbox v-model={row.attachments}></el-checkbox>
                    },
                },
            ],
            actions: [
                {
                    key: 'delete',
                    icon: 'el-icon-delete',
                    handler: this.handleDelete,
                },
            ],
        }
    },
    methods: {
        handleDragEnd(newData) {
            this.tableData = newData
            // 可以在这里处理排序后的数据，如调用接口保存新的排序
        },
        handleEdit(row) {
            // 处理编辑逻辑
        },
        handleDelete(row) {
            // 处理删除逻辑
        },
    },
}
</script>
```
