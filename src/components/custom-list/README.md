# CustomList 自定义列表组件


基于 Element UI 的自定义列表组件，支持 JSX 渲染、网格布局、分页、加载状态等功能。

## 功能特点

- 支持 JSX 渲染列表项
- 支持网格布局（可配置列数和间距）
- 支持自定义列表项展示方式
- 支持数据加载状态展示
- 支持空数据状态展示
- 支持分页配置
- 响应式布局
- 支持与 sg-base-form 表单组件配合使用

## 使用方法

### 基础用法

```vue
<template>
  <custom-list
    v-model="currentPage"
    :loading="loading"
    :load-data="loadData"
  >
    <template #default="{ item }">
      <div class="list-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </template>
  </custom-list>
</template>

<script>
import CustomList from '@/components/custom-list/index.vue'
export default {
  components: {
    CustomList,
  },
  data() {
    return {
      currentPage: 1,
      loading: false
    }
  },
  methods: {
    async loadData({ page, pageSize }) {
      // 返回数据格式：{ data: any[], total: number }
      const { data, total } = await fetchData(page, pageSize)
      return { data, total }
    }
  }
}
</script>
```

### 与 sg-base-form 配合使用

```vue
<template>
  <div>
    <!-- 搜索表单 -->
    <sg-base-form 
      ref="formRef" 
      v-model="formModel" 
      v-bind="getFormAttrs" 
      v-loading="View.loading" 
      @submit="search" 
      @reset="search"
    />

    <!-- 列表展示 -->
    <custom-list
      ref="customListRef"
      v-model="currentPage"
      :loading="View.loading"
      :load-data="loadData"
      :grid-columns="2"
      :grid-gap="12"
    >
      <template #default="{ item }">
        <component-item 
          :data="item" 
          @select="handleSelect"
          class="dark"
        >
          <template #footer>
            <el-button type="primary" plain round>下架</el-button>
            <el-button type="primary" plain round>编辑</el-button>
          </template>
        </component-item>
      </template>
    </custom-list>
  </div>
</template>

<script>
import CustomList from '@/components/custom-list/index.vue'
export default {
  components: {
    CustomList,
  },
  data() {
    return {
      View: {
        loading: false
      },
      formModel: {
        componentTypeCode: '',
        componentName: ''
      },
      currentPage: 1
    }
  },
  computed: {
    getFormAttrs() {
      return {
        fields: [
          {
            tag: 'select',
            name: 'componentTypeCode',
            itemAttrs: {
              label: '类型'
            },
            attrs: {
              placeholder: '请选择组件类型',
              options: [
                { label: '业务组件-主模块', value: '1' },
                { label: '业务组件-子模块', value: '2' }
              ]
            }
          },
          {
            tag: 'input',
            name: 'componentName',
            itemAttrs: {
              label: '名称'
            },
            attrs: {
              placeholder: '请输入组件名称'
            }
          }
        ],
        autoAppendAction: true
      }
    }
  },
  methods: {
    async search() {
      await this.$refs.customListRef.search()
    },
    async loadData({ page, pageSize }) {
      const formModel = this.formModel
      const { data } = await this.$http.request({
        url: '/api/component/getComponentPageList',
        method: 'post',
        data: {
          componentName: formModel.componentName,
          componentTypeCode: formModel.componentTypeCode,
          pageNum: page,
          length: pageSize
        }
      })
      return {
        data: data.data,
        total: data.total
      }
    },
    handleSelect(selectedComponent) {
      // 处理选中逻辑
      console.log('Selected component:', selectedComponent)
    }
  }
}
</script>
```



## Props

| 参数           | 说明                   | 类型      | 可选值       | 默认值 |
|---------------|------------------------|-----------|-------------|--------|
| value/v-model | 当前页码              | number    | —           | 1      |
| pageSize      | 每页显示条目个数       | number    | —           | 10     |
| pageSizes     | 每页显示个数选择器选项 | number[]  | —           | [10, 20, 50, 100] |
| loading       | 加载状态              | boolean   | —           | false  |
| loadData      | 数据加载函数          | function  | —           | —      |
| layout        | 分页组件布局          | string    | —           | 'total, sizes, prev, pager, next, jumper' |
| gridColumns   | 网格列数              | number    | —           | 1      |
| gridGap       | 网格间距（像素）      | number    | —           | 16     |
| itemRender    | JSX 渲染函数          | function  | —           | —      |

## Events

| 事件名称        | 说明                   | 回调参数 |
|---------------|------------------------|----------|
| page-change   | 当前页码改变时触发      | 新的页码  |
| size-change   | 每页条数改变时触发      | 新的每页条数 |

## Slots

| 插槽名称 | 说明                | 作用域参数 |
|---------|-------------------|------------|
| default | 自定义列表项内容     | { item: 当前项数据, index: 当前项索引 } |
| empty   | 自定义空数据展示内容 | — |
| loading | 自定义加载中展示内容 | — |

## Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| search | 触发数据重新加载 | — | 