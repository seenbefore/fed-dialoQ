<template>
    <div class="sg-custom-list">
        <!-- 加载状态 -->
        <div v-if="loading" class="sg-custom-list__loading">
            <slot name="loading">
                <el-skeleton :rows="3" animated />
            </slot>
        </div>
        <!-- 列表内容 -->
        <template v-else>
            <div v-if="data && data.length > 0" class="sg-custom-list__content" :style="gridStyle">
                <template v-for="(item, index) in data">
                    <template v-if="itemRender">
                        <div :key="index" class="sg-custom-list__item" :style="itemStyle">
                            <component :is="itemRender(item, $createElement)" />
                        </div>
                    </template>
                    <template v-else>
                        <div :key="index" class="sg-custom-list__item" :style="itemStyle">
                            <slot :item="item" :index="index" />
                        </div>
                    </template>
                </template>
            </div>
            <!-- 空数据状态 -->
            <div v-else class="sg-custom-list__empty">
                <slot name="empty">
                    <el-empty description="暂无数据" />
                </slot>
            </div>
            <!-- 分页器 -->
            <div v-if="total > 0" class="sg-custom-list__pagination">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    :layout="layout"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                />
            </div>
        </template>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

/**
 * 自定义列表组件
 * 支持自定义列表项展示方式，支持JSX渲染，支持数据加载状态和空数据展示
 */
@Component({
    name: 'CustomList',
})
export default class CustomList extends Vue {
    /** 当前页码 */
    @Model('input', { type: Number, default: 1 })
    readonly value!: number

    /** 每页显示条目个数 */
    @Prop({ type: Number, default: 10 })
    readonly pageSize!: number

    /** 每页显示个数选择器的选项设置 */
    @Prop({
        type: Array,
        default: () => [10, 20, 50, 100],
    })
    readonly pageSizes!: number[]

    /** 组件布局 */
    @Prop({
        type: String,
        default: 'total, prev, pager, next, jumper',
    })
    readonly layout!: string

    /** 是否显示加载中状态 */
    @Prop({ type: Boolean, default: false })
    readonly loading!: boolean

    /** 数据加载函数，返回 { data: any[], total: number } */
    @Prop({
        type: Function,
        required: true,
    })
    readonly loadData!: (params: { page: number; pageSize: number }) => Promise<{ data: any[]; total: number }>

    /** 网格列数 */
    @Prop({ type: Number, default: 1 })
    readonly gridColumns!: number

    /** 网格间距（像素） */
    @Prop({ type: Number, default: 16 })
    readonly gridGap!: number

    /** JSX渲染函数 */
    @Prop({ type: Function })
    readonly itemRender?: (item: any, h: CreateElement) => VNode | string

    /** 当前页码（内部使用） */
    private get currentPage() {
        return this.value
    }

    private set currentPage(val: number) {
        this.$emit('input', val)
    }

    /** 列表数据 */
    private data: any[] = []
    /** 总条数 */
    private total = 0

    /** 网格样式 */
    private get gridStyle() {
        if (this.gridColumns <= 1) return {}
        return {
            display: 'flex',
            flexWrap: 'wrap',
            margin: `-${this.gridGap}px 0 0 -${this.gridGap}px`,
        }
    }

    /** 列表项样式 */
    private get itemStyle() {
        return {
            flex: 'none',
            boxSizing: 'border-box',
            padding: `0 0 0 ${this.gridGap}px`,
            margin: `${this.gridGap}px 0 0 0`,
            width: this.gridColumns <= 1 ? '100%' : `${100 / this.gridColumns}%`,
        }
    }

    /** 每页条数变化 */
    private async handleSizeChange(val: number) {
        this.$emit('size-change', val)
        await this.fetchData(1, val)
    }

    /** 当前页变化 */
    private async handlePageChange(val: number) {
        this.$emit('page-change', val)
        await this.fetchData(val, this.pageSize)
    }

    /** 获取数据 */
    private async fetchData(page: number, pageSize: number) {
        try {
            const { data, total } = await this.loadData({ page, pageSize })
            this.data = data
            this.total = total
        } catch (error) {
            console.error('Failed to fetch data:', error)
            this.data = []
            this.total = 0
        }
    }

    async created() {
        await this.fetchData(this.currentPage, this.pageSize)
    }

    @Watch('value')
    async onPageChange(val: number) {
        await this.fetchData(val, this.pageSize)
    }

    @Watch('pageSize')
    async onPageSizeChange(val: number) {
        await this.fetchData(this.currentPage, val)
    }
    // 查询
    async search() {
        await this.fetchData(1, this.pageSize)
    }
}
</script>

<style lang="less" scoped>
.sg-custom-list {
    &__content {
        min-height: 100px;
    }

    &__loading,
    &__empty {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
    }

    &__pagination {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
