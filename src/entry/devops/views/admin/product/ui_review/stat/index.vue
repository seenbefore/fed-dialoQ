<template>
    <PageWrapper class="sg-page AdminUi_reviewStat " :title="$route.meta.title">
        <template #extra>
            <el-date-picker
                v-model="formModel.daterange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="onDateChange"
            ></el-date-picker>
        </template>

        <div class="analytic-insight-summary">
            <div class="item">
                <span translate="modules.PROJECT" class="text-desc font-size-md ng-star-inserted">产品数</span>
                <!---->
                <!---->
                <span class="text-secondary text-number" v-text="statModel.productTotal"></span>
            </div>

            <!---->
            <div class="item ng-star-inserted">
                <span translate="mission.project.PENDING_TASK" class="text-desc font-size-md">产品走查数</span>
                <span class="text-secondary text-number" v-text="statModel.productTotalWithReview"></span>
            </div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">产品覆盖率</span>
                <span class="text-danger text-number" v-text="statModel.productRate"></span>
            </div>
            <!---->
            <div class="divider"></div>
            <div class="item">
                <span translate="status.PROGRESS" class="text-desc font-size-md">走查总数</span>
                <span class="text-secondary text-number" v-text="statModel.reviewTotal"></span>
            </div>
            <div class="item">
                <span translate="status.PROGRESS" class="text-desc font-size-md">进行中</span>
                <span class="text-warning text-number" v-text="statModel.reviewOpendTotal"></span>
            </div>
            <!---->
            <div class="item ng-star-inserted">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">已完成</span>
                <span class="text-success text-number" v-text="statModel.reviewFinishedTotal"></span>
            </div>
            <!---->
            <div class="divider"></div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">人员覆盖率</span>
                <span class="text-danger text-number" v-text="statModel.reviewRate"></span>
            </div>
            <div class="item">
                <span translate="mission.project.DELAY_UNFINISHED" class="text-desc font-size-md">平均分</span>
                <span class="text-danger text-number" v-text="statModel.reviewScore"></span>
            </div>
        </div>

        <sg-data-view v-bind="getTableAttrs" ref="tableRef" class="sg-mt-3"></sg-data-view>
    </PageWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { UserService, UedReviewService, UserGroupService } from '@/entry/devops/api'
import { MyMixins } from '@/entry/devops/mixins'
import { userStore } from '@/entry/devops/store/useStore'
import { dateFormat, getKPIDateRange, getCurrentMonthDateRange } from '@/scripts/utils'

import { FormColumn, FormRow, FormRef, TableColumn, TableRef, TableLoad, TableLoadValue } from '@/sharegood-ui'
@Component({
    name: 'AdminUi_reviewStat',
    components: {},
})
export default class AdminUi_reviewStat extends MyMixins {
    async mounted() {
        const { data } = await UserGroupService.get({
            name: '前端开发',
        })
        this.formModel.name = data.records.map((item: any) => item.label)
        this.handleSearch()
        this.stat()
    }

    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    async stat() {
        const { daterange = [] } = this.formModel
        const [timeStart, timeEnd] = daterange

        const params = {}
        if (timeStart && timeEnd) {
            Object.assign(params, {
                conditions: {
                    timeStart,
                    timeEnd,
                },
            })
        }

        const { data } = await UedReviewService.statReviewCount(params)

        Object.assign(this.statModel, data)
        const res = await UedReviewService.statProductCount(params)
        const productList = res.data.filter((item: any) => new Date(item.createdAt).valueOf() >= new Date(timeStart).valueOf() && new Date(item.createdAt).valueOf() <= new Date(timeEnd).valueOf())
        const productTotal = productList.length
        const productTotalWithReview = productList.filter((item: any) => item.count > 0).length
        const productRate = productTotal > 0 ? ((productTotalWithReview / productTotal) * 100).toFixed(2) + '%' : 0
        Object.assign(this.statModel, {
            productTotal,
            productTotalWithReview,
            productRate,
        })
    }
    onDateChange(val: any) {
        console.log(1, val)
        this.handleSearch()
        this.stat()
    }
    formModel = {
        daterange: getKPIDateRange(),
        name: [],
    }
    statModel = {
        productTotal: 0,
        productTotalWithReview: 0,
        productRate: 0,
        reviewTotal: 0,
        reviewOpendTotal: 0,
        reviewFinishedTotal: 0,
        reviewRate: 0,
        // 平均分
        reviewScore: 0,
    }
    getTableAttrs = {
        auto: false,
        pagination: {
            pageSize: 1000,
        },
        load: async (params: any = {}) => {
            const { name, daterange } = this.formModel

            const res = await UedReviewService.stat({
                conditions: {
                    name,
                    timeStart: daterange?.[0],
                    timeEnd: daterange?.[1],
                },
            })
            const total = res.data.length
            const reviewed = res.data.filter((item: any) => item.score > 0).length
            const reviewRate = total > 0 ? ((reviewed / total) * 100).toFixed(2) + '%' : 0
            const reviewScore = res.data.reduce((prev: any, next: any) => prev + next.score, 0) / reviewed
            Object.assign(this.statModel, {
                reviewRate,
                reviewScore: reviewScore.toFixed(0),
            })
            return {
                result: res.data,
                total,
            }
        },
        columns: [
            {
                label: '序号',
                type: 'index',
                prop: 'index',
                fixed: 'left',
                exportRender(row: any, index: any) {
                    return index + 1
                },
            },

            // {
            //     align: 'left',
            //     label: '项目',
            //     prop: 'title',
            //     minWidth: '150px',
            //     render(h, { row }) {
            //         const { product_title, product_version } = row
            //         if (!product_title) {
            //             return ''
            //         }
            //         return [
            //             h('div', [
            //                 h(
            //                     'router-link',
            //                     {
            //                         class: 'sg-link',
            //                         props: {
            //                             to: {
            //                                 path: `/admin/product/list`,
            //                                 query: {
            //                                     _: product_title,
            //                                     title: product_title,
            //                                     version: product_version,
            //                                     affix: 0,
            //                                 },
            //                             },
            //                         },
            //                     },
            //                     `${product_title} ${product_version}`,
            //                 ),
            //             ]),
            //         ]
            //     },
            //     exportRender(row: any, index: any) {
            //         const { product_title, product_version } = row
            //         if (product_title) {
            //             return `${product_title} ${product_version}`
            //         } else {
            //             return ''
            //         }
            //     },
            // },

            {
                align: 'left',
                label: '被检查人',
                prop: 'name',
                width: '100px',
                fixed: 'left',
            },
            {
                align: 'left',
                label: '标题',
                prop: 'titles',
                minWidth: '300px',
            },

            {
                align: 'left',
                label: '检查人员',
                prop: 'reviewerNames',
                width: '200px',
            },
            // {
            //     align: 'left',
            //     label: '时间',
            //     prop: 'createdAt',
            //     width: '180px',
            //     render: (h, { row }) => {
            //         if (row.createdAt) {
            //             return dateFormat(new Date(row.createdAt), 'YYYY-MM-DD HH:mm:ss')
            //         }
            //     },
            //     exportRender(row: any, index: any) {
            //         if (row.createdAt) {
            //             return dateFormat(new Date(row.createdAt), 'YYYY/MM/DD')
            //         }
            //     },
            // },

            {
                align: 'left',
                label: '走查次数',
                prop: 'count',
                width: '80px',
                fixed: 'right',
            },
            {
                align: 'left',
                label: '最低分',
                prop: 'minScore',
                width: '70px',
                fixed: 'right',
            },
            {
                align: 'left',
                label: '最高分',
                prop: 'maxScore',
                width: '70px',
                fixed: 'right',
            },
            {
                align: 'left',
                label: '平均分',
                prop: 'avgScore',
                width: '80px',
                fixed: 'right',
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less" scoped>
.analytic-insight-summary {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.analytic-insight-summary .item {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.analytic-insight-summary .item .text-number {
    font-size: 2.5em;
}

.analytic-insight-summary .divider {
    width: 1px;
    background: #eee;
    height: 76px;
    overflow: hidden;
}
.text-success {
    color: #73d897 !important;
}
.text-secondary {
    color: #666 !important;
}
.text-desc {
    color: #aaa !important;
}
.text-warning {
    color: #ffcd5d !important;
}
.text-danger {
    color: #ff7575 !important;
}
</style>
