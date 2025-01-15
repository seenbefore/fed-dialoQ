## sg-data-view 动态表格组件

基于 Element UI Table 封装的动态表格组件,集成了分页、排序、列操作、虚拟滚动等功能。

### 功能特点

- 集成分页功能
- 支持列排序
- 支持列显示/隐藏操作
- 支持虚拟滚动
- 支持跨页选择数据
- 支持自定义列渲染
- 支持数据导出
- 支持表格打印

### 基础用法

```vue
<template>
  <sg-data-view v-bind="getTableAttrs" ref="tableRef" />
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { TableColumn } from '@/sharegood-ui'

@Component
export default class TableDemo extends Vue {
  get getTableAttrs() {
    return {
      columns: this.getColumns,
      load: this.loadData
    }
  }

  get getColumns(): TableColumn[] {
    return [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '年龄',
        prop: 'age'
      },
      {
        label: '操作',
        prop: 'action',
        render: (h, { row }) => {
          return (
            <el-button onClick={() => this.handleClick(row)}>
              查看
            </el-button>
          )
        }
      }
    ]
  }

  async loadData(params: any) {
    const { data } = await this.getList(params)
    return {
      result: data.list,
      total: data.total
    }
  }

  handleClick(row: any) {
    console.log(row)
  }
}
</script>
```

### 属性说明

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| defaultValue | 数据为空时的默认显示值 | string | — | - |
| columns | 列配置数组 | Array | — | [] |
| auto | 是否自动加载数据 | boolean | — | true |
| pageVisible | 是否显示分页 | boolean | — | true |
| pagination | 分页配置,参考 element-ui | object | — | {page: 1, pageSize: 10, pageSizes: [10, 20, 50, 100, 200]} |
| load | 数据加载方法,需返回 Promise | function | — | — |
| paramsSerializer | 自定义分页参数序列化方法 | function | — | — |
| multipleSelectionAll | 跨页选择的初始数据 | array | — | [] |
| idKey | 跨页数据匹配的唯一键名 | string | — | — |
| border | 是否显示边框 | boolean | — | false |
| maxHeight | 最大高度 | number/string | — | — |
| virtualized | 是否启用虚拟滚动 | boolean | — | false |
| itemSize | 虚拟滚动的行高 | number | — | 40 |
| sortOptions | 排序选项配置 | array | — | [] |
| hasBar | 是否显示工具栏 | boolean | — | false |
| exportName | 导出文件名称 | string | — | '导出数据' |
| tableHeaderSticky | 表头是否吸顶 | boolean/object | — | false |
| paginationStickyBottom | 分页是否吸底 | boolean/object | — | false |
| allowCheckExport | 是否允许勾选导出 | boolean/string | — | false |
| customLockColumn | 自定义锁列的列数 | number | — | 0 |

### 列配置

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| label | 列标题 | string | — | — |
| prop | 列字段名 | string | — | — |
| width | 列宽度 | string | — | — |
| minWidth | 最小列宽度 | string | — | — |
| fixed | 列是否固定 | string/boolean | true/left/right | — |
| render | 自定义渲染函数 | function(h, {row, column, $index}) | — | — |
| slotName | 使用插槽渲染 | string | — | — |

### 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| onLoad | 重新加载数据 | params: {page, pageSize} |
| clearSelection | 清空选择 | — |
| getSelection | 获取选中项 | — |
| exportAll | 导出全部数据 | — |
| handlePrint | 打印表格 | — |
| scrollTop | 滚动到顶部 | — |

### 事件

| 事件名称 | 说明 | 回调参数 |
|----------|------|----------|
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| selection-change-all | 跨页选择变化时触发 | selection |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |

### 插槽

| 插槽名称 | 说明 |
|----------|------|
| bar | 工具栏区域 |
| bar-head | 工具栏头部区域 |
| bar-foot | 工具栏底部区域 |
| header | 表格头部区域 |
| empty | 空数据时的内容 |
| virgin | 首次加载时的内容 |
| page-header | 分页器头部区域 |
| page-body | 分页器主体区域 |

### 虚拟滚动

当数据量较大时,可以开启虚拟滚动来提升性能:

```vue
<template>
  <sg-data-view v-bind="getTableAttrs" />
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { TableColumn } from '@/sharegood-ui'

@Component
export default class VirtualTableDemo extends Vue {
  get getTableAttrs() {
    return {
      columns: this.getColumns,
      load: this.loadData,
      virtualized: true,
      itemSize: 40
    }
  }

  get getColumns(): TableColumn[] {
    return [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '年龄',
        prop: 'age'
      }
    ]
  }

  async loadData(params: any) {
    const { data } = await this.getList(params)
    return {
      result: data.list,
      total: data.total
    }
  }
}
</script>
```

### 跨页选择

支持跨页选择数据,需要配置 idKey:

```vue
<template>
    <sg-data-view v-bind="getTableAttrs" @selection-change-all="handleSelectionChange" />
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { TableColumn } from '@/sharegood-ui'

@Component
export default class SelectionTableDemo extends Vue {
    private selectedRows: any[] = []

    get getTableAttrs() {
        return {
            columns: this.getColumns,
            load: this.loadData,
            idKey: 'id',
            multipleSelectionAll: this.selectedRows,
        }
    }

    get getColumns(): TableColumn[] {
        return [
            {
                type: 'selection',
            },
            {
                label: '姓名',
                prop: 'name',
            },
            {
                label: '年龄',
                prop: 'age',
            },
        ]
    }

    async loadData(params: any) {
        const { data } = await this.getList(params)
        return {
            result: data.data,
            total: data.total,
        }
    }

    // params 是分页信息
    async getList(params: any) {
        return {
            data: {
                data: [
                    {
                        id: 1,
                        name: '张三',
                        age: 18,
                    },
                ],
                total: 0,
            },
        }
    }
    handleSelectionChange(selection: any[]) {
        this.selectedRows = selection
        console.log(this.selectedRows)
    }
}
</script>
```

### 自定义渲染

支持通过 render 函数或插槽自定义列内容:

```vue
<template>
  <sg-data-view v-bind="getTableAttrs">
    <template #status="{ row }">
      <el-tag>{{ row.status }}</el-tag>
    </template>
  </sg-data-view>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { TableColumn } from '@/sharegood-ui'

@Component
export default class CustomRenderTableDemo extends Vue {
  get getTableAttrs() {
    return {
      columns: this.getColumns
    }
  }

  get getColumns(): TableColumn[] {
    return [
      {
        label: '状态',
        prop: 'status',
        slotName: 'status'
      },
      {
        label: '操作',
        prop: 'action',
        render: (h, { row }) => {
          return (
            <el-button onClick={() => this.handleClick(row)}>
              编辑
            </el-button>
          )
        }
      }
    ]
  }

  handleClick(row: any) {
    console.log(row)
  }
}
</script>
```

### 完整示例

下面是一个包含了大部分常用功能的完整示例:

```vue
<template>
  <sg-data-view
    v-bind="getTableAttrs"
    ref="tableRef"
    @selection-change-all="handleSelectionChange"
  >
    <template #bar>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </template>
    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </sg-data-view>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { TableColumn, TableRef } from '@/sharegood-ui'

interface ITableRow {
  id: string
  name: string
  age: number
  status: number
  createTime: string
}

@Component
export default class CompleteTableDemo extends Vue {
  @Ref('tableRef') private tableRef!: TableRef

  private selectedRows: ITableRow[] = []

  private sortOptions = [
    { label: '创建时间升序', value: 'asc', key: 'createTime', value: 'asc' },
    { label: '创建时间降序', value: 'desc', key: 'createTime', value: 'desc' }
  ]

  get getTableAttrs() {
    return {
      columns: this.getColumns,
      load: this.loadData,
      hasBar: true,
      sortOptions: this.sortOptions,
      virtualized: true,
      itemSize: 40,
      idKey: 'id',
      multipleSelectionAll: this.selectedRows,
      tableHeaderSticky: true,
      paginationStickyBottom: true
    }
  }

  get getColumns(): TableColumn[] {
    return [
      {
        type: 'selection',
        width: '50px',
        fixed: 'left'
      },
      {
        type: 'index',
        label: '序号',
        width: '60px'
      },
      {
        label: '姓名',
        prop: 'name',
        minWidth: '120px'
      },
      {
        label: '年龄',
        prop: 'age',
        width: '80px'
      },
      {
        label: '状态',
        prop: 'status',
        width: '100px',
        slotName: 'status'
      },
      {
        label: '创建时间',
        prop: 'createTime',
        width: '160px'
      },
      {
        label: '操作',
        prop: 'action',
        width: '150px',
        fixed: 'right',
        render: (h, { row }) => {
          return (
            <div>
              <el-button type="text" onClick={() => this.handleEdit(row)}>
                编辑
              </el-button>
              <el-button type="text" onClick={() => this.handleDelete(row)}>
                删除
              </el-button>
            </div>
          )
        }
      }
    ]
  }

  async loadData(params: any) {
    const { data } = await this.getList(params)
    return {
      result: data.list,
      total: data.total
    }
  }

  handleSelectionChange(selection: ITableRow[]) {
    this.selectedRows = selection
  }

  handleAdd() {
    // 处理新增
  }

  handleEdit(row: ITableRow) {
    // 处理编辑
  }

  async handleDelete(row: ITableRow) {
    await this.$confirm('确认删除该记录?')
    // 处理删除
    await this.tableRef.onLoad()
  }

 
}
</script>
```