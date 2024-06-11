## 可上拉加载下拉刷新的列表

### 组件属性

| 参数 | 说明 | 类型 | 默认值 |
| :-: | :-: | :-: | :-: |
| load | 数据请求返回一个Promise,成功后resolve({result:any[],total:number}) | Function<Promise> | result为数据集,total为总数 |
| autoLoad | 第一次是否自动请求 | Boolean | true |
| disabledRefresh | 禁用下拉刷新 | boolean | false |
| finishedText | 列表数据加载完成文案 | String | 没有更多了 |
| listLoadingText | 列表数据加载中文案 | String | 加载中... |
| notLoadText | 数据未请求时文案 | String | 请查询数据 |
| errorText | 数据加载错误文案 | String | 请求失败，点击重新加载 |
| isSearch | 是否搜索列表 | boolean | false |


### 方法

| 事件名称 | 说明 | 回调参数 |
| :-: | :-: | :-: |
| reload | 加载列表数据 | isRefresh：是否以刷新模式加载，默认值false |
| reset | 重置列表状态，根据初始化配置决定是否请求数据 | - |

### 插槽

| 名称 | 说明 |
| :----------: | :--------------------: |
| default | 列表内容 |
| notLoad | 未加载数据时的缺省内容 |
| empty | 无数据时的内容 |
| error | 请求错误时的内容 |

### 基础使用示例

```vue
<template>
    <div class="sg-page page-scroll-class">
        <my-list
            ref="ref_list"
            :load="loadData"
            :auto-load="true"
            empty-text="抱歉，没有找到相关企业"
            not-load-text="请点击按钮发起请求"
            list-loading-text="数据在加载中哦!"
            finished-text="已加载所有数据~"
            :disabled-refresh="false"
        >
            <template v-slot="{ item }">
                <ItemCell :data="item" />
            </template>
        </my-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MyListRef } from '@/entry/h5/scripts/types'
import { getData } from '../data'
import ItemCell from '../components/ItemCell/index.vue'


@Component({
    name: 'PageScrollDefault',
    components: {
        ItemCell,
    },
})
export default class PageScrollDefault extends Vue {
    @Ref('ref_list')
    ref_list!: MyListRef

    created() {}

    mounted() {}

    async loadData({ currentPage = 1 }: any = {}) {
        const body = {
            pageNum: currentPage,
            pageSize: 10,
        }
        try {
            const { data, total }: any = await getData(body)
            return {
                total,
                result: data,
            }
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="less" scoped>
.page-scroll-class {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>
```
