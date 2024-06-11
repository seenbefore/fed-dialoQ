<template>
    <PageWrapper class="sg-page AdminProductUi_reviewProduct_stat " :title="$route.meta.title">
        <template #extra>
            <el-date-picker
                v-model="formModel.daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="onDateChange"
            ></el-date-picker>
        </template>

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
    name: 'AdminProductUi_reviewProduct_stat',
    components: {},
})
export default class AdminProductUi_reviewProduct_stat extends MyMixins {
    async mounted() {
        this.handleSearch()
    }

    @Ref('tableRef')
    tableRef!: TableRef
    handleSearch(val = {}) {
        this.tableRef.onLoad({ page: 1 })
    }
    async stat() {}
    onDateChange(val: any) {
        this.handleSearch()
        this.stat()
    }
    formModel = {
        daterange: getCurrentMonthDateRange(),
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
    }
    getTableAttrs = {
        auto: false,
        pagination: {
            pageSize: 1000,
        },
        load: async (params: any = {}) => {
            const { daterange } = this.formModel

            const { data } = await UedReviewService.product_stat({
                conditions: {
                    timeStart: daterange?.[0],
                    timeEnd: daterange?.[1],
                },
            })

            const total = data.length

            return {
                result: data,
                total: total,
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

            {
                align: 'left',
                label: '项目',
                prop: 'title',
                minWidth: '250px',
                render: (h, { row }) => {
                    return h(
                        'router-link',
                        {
                            class: 'sg-link',
                            props: {
                                to: {
                                    path: `/product/detail`,
                                    query: {
                                        // title: encodeURIComponent(row.title),
                                        // version: encodeURIComponent(
                                        //     row.version,
                                        // ),
                                        title: row.title,
                                        version: row.version,
                                    },
                                },
                            },
                            attrs: {
                                target: '_blank',
                            },
                        },
                        row.title,
                    )
                },
            },

            {
                align: 'left',
                label: '版本',
                prop: 'version',
                width: '100px',
                render: (h, { row }) => {
                    return h(
                        'router-link',
                        {
                            class: 'sg-link',
                            props: {
                                to: {
                                    path: `/product/detail`,
                                    query: {
                                        // title: encodeURIComponent(row.title),
                                        // version: encodeURIComponent(
                                        //     row.version,
                                        // ),
                                        title: row.title,
                                        version: row.version,
                                    },
                                },
                            },
                            attrs: {
                                target: '_blank',
                            },
                        },
                        row.version,
                    )
                },
            },
            {
                align: 'left',
                label: '产品经理',
                prop: 'author',
                minWidth: '80px',
            },
            {
                align: 'left',
                label: '设计',
                prop: 'ued_author',
                minWidth: '80px',
            },
            {
                align: 'left',
                label: '前端',
                prop: 'developers',
                minWidth: '300px',
            },
            {
                align: 'left',
                label: '走查次数',
                prop: 'count',
                width: '80px',
            },
            {
                align: 'left',
                label: '走查结果',
                prop: 'score',
                width: '80px',
                fixed: 'right',
                render(h, { row }) {
                    let { score } = row
                    let myClass = 'text-success'
                    if (!score) {
                        return ''
                    }
                    score = Math.ceil(score)
                    if (score < 80) {
                        myClass = 'text-warning'
                    }
                    if (score < 60) {
                        myClass = 'text-danger'
                    }
                    return [
                        h(
                            'div',
                            {
                                class: `text-number ${myClass}`,
                            },
                            [score],
                        ),
                    ]
                },
                exportRender(row: any, index: any) {
                    let { score } = row
                    if (!score) {
                        return ''
                    }
                    score = Math.ceil(score)
                    return score
                },
            },
        ] as TableColumn[],
    }
}
</script>

<style lang="less">
.AdminProductUi_reviewProduct_stat {
    .text-number {
        font-size: 1.5em;
    }
    .text-success {
        color: #73d897;
    }
    .text-danger {
        color: #ff7575;
    }
    .text-warning {
        color: #ffcd5d;
    }
}
</style>
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
