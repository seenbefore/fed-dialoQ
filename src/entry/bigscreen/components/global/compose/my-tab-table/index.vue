<!--
   tab-table - 组件
-->
<template>
    <div class="my-tab-table">
        <my-base-tab class="sg-m-b-6" v-model="value" :list="tabList" :row-span="tabRowSpan" @changeTab="changeTab" />

        <sg-data-view class="table-view" ref="tableRef" :load="syncData" :columns="tableColumns" :pagination="pagination" :page-visible="pageVisible" :auto="auto"></sg-data-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TabTableRef } from '../../../../types/index'

@Component({
    name: 'MyTabTable',
    components: {},
})
export default class MyTabTable extends Vue {
    /** 是否自动查询 */
    @Prop({ default: true }) auto!: boolean
    @Prop({ default: '' }) value!: string | number
    @Prop({ default: '10' }) tabRowSpan!: string | number
    @Prop({ default: () => [] }) tabList!: any[]
    @Prop({ default: () => ({}) }) pagination!: any
    /** 列表 -table */
    @Prop({ default: () => [] }) tableColumns!: any[]
    @Prop({ default: false }) pageVisible!: boolean
    /** 请求方法 */
    @Prop({
        default: () => Promise.resolve({ result: [], total: 0 }),
    })
    load!: (query: any) => Promise<any>
    public $refs!: {
        tableRef: TabTableRef
    }
    activeTab = '1'
    created() {}
    mounted() {}
    /** 初始化 */
    init() {
        this.$refs.tableRef.onLoad({ page: 1 })
    }
    /** 查询 */
    search(data?: any) {
        this.init()
    }
    changeTab(data: any) {
        const { item, index } = data
        if (this.activeTab === item.value) return
        this.activeTab = item.value
        this.$emit('input', item.value)
        this.$emit('change', { item, index })
        if (this.auto) {
            this.search()
        }
    }
    async syncData(query: any) {
        // console.log('query :>> ', query)
        const { page, pageSize } = query
        const params = {
            pageNum: page,
            pageSize: pageSize,
            tabType: this.activeTab,
        }
        console.log('params :>> ', params)
        let promise = this.load(params)
        if (!promise.then) {
            promise = Promise.resolve(promise)
        }
        try {
            const { result = [], total = 0 }: any = await promise
            return { result, total }
        } catch (err) {
            console.error('[my-page-module load]', err)
            return { result: [], total: 0 }
        }
    }
}
</script>

<style lang="less" scoped>
.my-tab-table {
    width: 100%;

    ::v-deep .el-table {
        background: rgba(42, 77, 136, 0.6);
        border: 1.5px solid rgba(73, 131, 245, 0.3);

        .cell {
            line-height: 40px;
        }

        td {
            .cell {
                height: 40px !important;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
            }
        }

        th {
            // background: rgba(32, 162, 255, 0.4);

            .cell {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
            }
        }

        &::before {
            background-color: #1a3674;
        }

        th,
        tr:nth-of-type(2n) {
            background-color: #07205c;

            td {
                border-bottom-color: #07205c;
                background-color: #07205c;
            }
        }
        tr:nth-of-type(2n + 1) {
            background-color: #0a3b8c;

            td {
                border-bottom-color: #0a3b8c;
                background-color: #0a3b8c;
            }
        }

        td,
        th.is-leaf {
            border-bottom-color: #11559f;
        }

        thead {
            th {
                background-color: #11559f;
                border: none;
            }
        }
    }

    ::v-deep .el-table--medium {
        td,
        th {
            padding: 0;
            height: 40px;
        }
    }

    ::v-deep {
        .el-loading-mask {
            background-color: rgba(0, 0, 0, 0.3);
        }
        .el-table__empty-block {
            background-color: #1a3674;
        }
    }
}
</style>
