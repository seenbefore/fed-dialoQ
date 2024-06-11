<template>
    <div class="sg-list-view">
        <div class="sg-list-view__head">
            <slot name="head"></slot>
        </div>
        <div class="sg-list-view__main" ref="mainRef">
            <div class="sg-list-view__list">
                <div class="sg-list-view__item" :class="itemClass" v-for="(item, index) in result" :key="index">
                    <slot :row="item"></slot>
                </div>
            </div>
        </div>
        <div class="sg-list-view__foot">
            <pagination
                :total="total"
                :page.sync="exPagination.page"
                :limit.sync="exPagination.pageSize"
                :page-sizes.sync="exPagination.pageSizes"
                v-bind="exPagination"
                @pagination="onLoad"
                class="sg-list-view__pagination"
            ></pagination>
        </div>
    </div>
</template>

<script>
import pagination from '../../pagination/src/index'

export default {
    name: 'SgListView',
    components: { pagination },
    props: {
        params: {
            type: Object,
            default() {
                return {}
            },
        },

        itemClass: {
            type: String,
            default: '',
        },

        footClass: {
            type: String,
            default: '',
        },
        auto: {
            type: Boolean,
            default: true,
        },
        load: {
            type: Function,
            default() {
                return Promise.resolve([])
            },
        },
    },
    data() {
        return {
            listLoading: false,
            result: [],
            total: 0,
            isError: false,
        }
    },
    computed: {
        myParamsSerializer() {
            const config = this.$ShareGood || {}
            const ListViewConfig = config.ListView || {}

            let paramsSerializer = this.paramsSerializer || ListViewConfig.paramsSerializer
            return paramsSerializer
        },
        exPagination() {
            const config = this.$ShareGood || {}
            const ListViewConfig = config.ListView || {}
            const PageConfig = ListViewConfig.pagination || {}
            const myPageConfig = this.pagination || {}

            const result = {
                pageSize: 20,
                visible: true,
                page: 1,
                pageSizes: [10, 20, 50, 100],
                layout: 'sizes,total,->,prev, pager, next, jumper',
                ...PageConfig,
                ...myPageConfig,
            }
            // console.log('exPagination', result)
            return result
        },
    },
    watch: {},
    created() {
        this.auto && this.onLoad()
    },
    mounted() {
        // 将form实例返回到父级
    },
    methods: {
        onLoad(params = {}) {
            let page = params.page
            let paramsSerializer = this.myParamsSerializer
            params.pageSize = params.pageSize || this.exPagination.pageSize
            if (page) {
                this.exPagination.page = page
            } else {
                page = this.exPagination.page
            }

            params = paramsSerializer ? paramsSerializer(params) : params
            this.load(params)
                .then(({ result, total }) => {
                    this.result = result
                    this.total = total
                })
                .catch(err => {
                    console.error(err)
                    this.isError = true
                })
        },
    },
}
</script>
