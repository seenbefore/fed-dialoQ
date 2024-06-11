<template>
    <div :class="{ hidden: hidden }" class="sg-flexbox align-center sg-pagination" ref="sgPage" :style="style">
        <div class="sg-pagination-showtxt">显示</div>
        <!-- <slot name="page-header"></slot> -->
        <el-pagination
            :hide-on-single-page="hideOnSinglePage"
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <slot name="page-body"></slot>
        </el-pagination>
        <slot name="page-footer"></slot>
    </div>
</template>

<script>
export default {
    name: 'SgPagination',
    props: {
        // 只有一页时是否隐藏
        hideOnSinglePage: {
            type: Boolean,
            default: false,
        },
        scrollContainer: {
            type: String,
            default: '',
        },
        total: {
            required: true,
            type: Number,
        },
        page: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 20,
        },
        pageSizes: {
            type: Array,
            default() {
                return [20, 50, 100]
            },
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper',
        },
        background: {
            type: Boolean,
            default: true,
        },
        autoScroll: {
            type: Boolean,
            default: true,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            style: '',
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            },
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            },
        },
    },
    mounted() {},
    methods: {
        handleSizeChange(val) {
            const maxpage = Math.ceil(this.total / val)
            let page = this.currentPage
            // 当改变条目后可能触发页码变化导致两个请求
            if (maxpage < this.currentPage) {
                page = 1
            }
            this.$emit('pagination', { page: page, limit: val })
            const $content = document.getElementById(this.scrollContainer)
            if ($content) {
                $content.scrollTop = 0
            }
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, limit: this.pageSize })
            const $content = document.getElementById(this.scrollContainer)
            if ($content) {
                $content.scrollTop = 0
            }
        },
    },
}
</script>
