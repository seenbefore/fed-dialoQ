<!-- 监控平台 -->
<template>
    <div class="Monitor sg-page column">
        <div class="EventMainBody">
            <FilterBox>
                <span class="total">
                    错误总数：
                    <span>{{ total }}</span>
                </span>
                <span class="total sg-ml-3">
                    分组：
                    <span>{{ groupTotal }}</span>
                </span>
            </FilterBox>
            <div class="sg-card-body" style="background-color:#26262e;min-height:150px;">
                <BaseChart :config="option" :style="{ height: '150px' }" v-if="chartData"></BaseChart>
            </div>
        </div>
        <div class="table">
            <sg-data-view ref="tableRef" v-bind="tableAttrs" @selection-change="onChange" v-if="$route.query.filters"></sg-data-view>
        </div>
    </div>
</template>

<script lang="tsx">
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator'
import { formatTimeAgo } from '@/scripts/utils'
import BaseChart from '@/sharegood-ui/packages/charts/BaseChart.vue'
import { created } from './components/helper'
import FilterBox from './components/FilterBox.vue'
import { summary, count } from '@/entry/monitor/api'
import moment from 'moment'
import { DurationEnum } from '@/entry/monitor/dict'
import { appStore } from '@/entry/monitor/store/useStore'
@Component({
    name: 'Monitor',
    components: { BaseChart, FilterBox },
})
export default class Monitor extends Vue {
    get filters() {
        let result = this.$route.query.filters || '{}'
        result = JSON.parse(result as any)
        return result as any
    }

    @Watch('filters', { immediate: true })
    watchRoute(val: any) {
        // 开始查询
        if (val && val.duration) {
            this.syncList()
            this.syncChart()
        }
    }
    refresh() {
        this.syncList()
        this.syncChart()
    }
    total = 0
    groupTotal = 0
    option = created()
    chartData = null as any
    mounted() {
        // this.constructorXAxisCategories()
    }
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef
    get tableAttrs() {
        return {
            //pageVisible: false,
            auto: false,
            height: '100%',
            border: false,
            pagination: { pageSize: 50 },

            load: async (pageInfo: any) => {
                let { pageNum, length } = pageInfo
                const filters = this.filters
                let { search, searchType, startTime, endTime } = filters
                let keyword: any = searchType ? { [searchType]: search } : {}

                console.log('pageInfo', pageInfo)

                const { data } = await summary({
                    filter: {
                        startTime,
                        endTime,
                        ...keyword,
                        clientName: appStore.clientName,
                    },
                })
                let total = 0
                data.forEach(item => {
                    total = total + (item.eventCount || 0)
                })
                this.total = total
                this.groupTotal = data.length
                let start = (pageNum - 1) * length
                let result = data.slice(start, start + length)

                return { result: result, total: data.length }
            },
            columns: [
                {
                    type: 'index',
                },
                {
                    label: '报错信息',
                    prop: 'action',
                    minWidth: '300px',
                    showOverflowTooltip: false,
                    align: 'left',
                    render: (h, { row }) => {
                        const { data } = row
                        const message = data?.message || row?.message || ''
                        const name = data?.name || row?.name || ''
                        const uri = row?.uri || data?.url || ''
                        return (
                            <div class="sg-flexbox align-center ErrorEventBlock">
                                <div class="sg-ml-2">
                                    <div class="sg-flexbox align-center SummaryContentHeadline">
                                        <span class="" style="font-size:16px;font-weight:bolder;">
                                            {name}
                                        </span>
                                    </div>

                                    <div class="SummaryContentMessage" style="font-size:12px;">
                                        {message}
                                    </div>
                                    <div class="SummaryContentIcons" style="display:none;">
                                        <div class="error-period">
                                            <span class="ng-binding"></span>
                                            <span style="padding:0 4px">~</span>
                                            <span class="ng-binding"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    },
                },
                {
                    label: '错误地址',
                    prop: 'action',
                    minWidth: '300px',
                    showOverflowTooltip: false,
                    align: 'left',
                    render: (h, { row }) => {
                        const { data } = row
                        const uri = row?.uri || data?.url || ''
                        return (
                            <div class="sg-flexbox align-center ErrorEventBlock">
                                <div class="sg-ml-2">
                                    <div style="font-size:12px;color:#999;">{uri}</div>
                                </div>
                            </div>
                        )
                    },
                },

                {
                    label: '最近发生时间',
                    prop: 'entname',
                    width: '170px',
                    render: (h, { row }) => {
                        const result = row.time ? moment(row.time).format('YYYY-MM-DD HH:mm') : ''

                        return <div>{result}</div>
                    },
                },
                {
                    label: '事件数',
                    prop: 'entname',
                    width: '100px',
                    render: (h, { row }) => {
                        const result = row.eventCount || '-'
                        return <div>{result}</div>
                    },
                },
                {
                    label: '设备数',
                    prop: 'entname',
                    width: '100px',
                    render: (h, { row }) => {
                        const result = row.deviceCount
                        return <div>{result}</div>
                    },
                },
                {
                    label: '用户数',
                    prop: 'entname',
                    width: '100px',
                    render: (h, { row }) => {
                        const result = row.userCount
                        return <div>{result}</div>
                    },
                },

                {
                    label: '应用标识',
                    prop: 'entname',
                    width: '150px',
                    render: (h, { row }) => {
                        const result = row.clientName
                        return <div>{result}</div>
                    },
                },

                {
                    align: 'left',
                    label: '操作',
                    prop: 'action',
                    width: '80px',
                    fixed: 'right',
                    render: (h, { row }) => {
                        return [
                            h(
                                'el-button',
                                {
                                    props: {
                                        type: 'text',
                                    },
                                    on: {
                                        click: () => {
                                            //this.handleDelete(row)
                                            this.redirect(row)
                                        },
                                    },
                                },
                                '查看',
                            ),
                        ]
                    },
                },
            ] as TableColumn[],
        }
    }

    /**刷新列表 */
    syncList() {
        this.$nextTick(() => {
            const table = this.$refs.tableRef as TableRef
            table.onLoad({ page: 1 })
        })
    }
    async syncChart() {
        try {
            let filters = this.filters
            let { duration, search, searchType, startTime, endTime } = filters
            let keyword: any = searchType ? { [searchType]: search } : {}

            let { data } = await count({
                duration,
                filter: {
                    startTime,
                    endTime,
                    ...keyword,
                },
            })
            data = data.map((item: any) => {
                const time = new Date(item.key).valueOf()
                let label = ''
                let format = item.key
                if (duration === DurationEnum.hour) {
                    label = moment(time).format('HH:mm')
                } else if (duration === DurationEnum.day) {
                    label = moment(time).format('HH:mm')
                } else if (duration === DurationEnum.week) {
                    label = moment(time).format('MM-DD')
                } else if (duration === DurationEnum.month) {
                    label = moment(time).format('MM-DD')
                } else if (duration === DurationEnum.other) {
                    label = moment(time).format('YYYY-MM-DD HH:mm')
                }
                return {
                    ...item,
                    label,
                    format,
                }
            })
            console.log(1222, duration, data)
            Object.assign(this.option, created(data))
            this.chartData = []
        } catch (error) {}
    }
    redirect(row: any) {
        const { startTime, endTime, duration } = this.filters
        let routeUrl = this.$router.resolve({
            path: `/dashboard/detail/${row.messageId}`,
            query: {
                filters: JSON.stringify({
                    startTime,
                    endTime,
                    duration,
                }),
            },
        })
        window.open(routeUrl.href, '_blank')
    }

    constructorXAxisCategories() {
        var xAxisCategories = [],
            headerFormat = [],
            duration = 'hour',
            filterStartTime = 1703484180000,
            filterEndTime = 1703570580000
        if ('hour' === duration) {
            for (var a = 0; a < 13; a++) {
                var b = moment(filterStartTime)
                        .add(5 * a, 'minute')
                        .format('HH:mm'),
                    c = moment(filterStartTime)
                        .add(5 * a, 'minute')
                        .format('YYYY-MM-DD HH:mm')
                xAxisCategories[a] = b
                headerFormat[a] = c
            }
        } else if ('day' === duration) {
            for (var d = 0; d < 25; d++) {
                var e = moment(filterStartTime)
                        .add(d, 'hour')
                        .format('HH'),
                    f = moment(filterStartTime)
                        .add(d, 'hour')
                        .format('YYYY-MM-DD HH')
                xAxisCategories[d] = e + ':00'
                headerFormat[d] = f + ':00'
            }
        } else if ('week' === duration) {
            for (var g = 0; g < 8; g++) {
                var h = moment(filterStartTime)
                        .add(g, 'day')
                        .format('MM-DD'),
                    i = moment(filterStartTime)
                        .add(g, 'day')
                        .format('YYYY-MM-DD')
                xAxisCategories[g] = h
                headerFormat[g] = i + ' 00:00'
            }
        } else if ('month' === duration) {
            for (var j = moment(filterStartTime), k = moment(filterEndTime), l = k.diff(j, 'days'), m = 0; m < l + 1; m++) {
                var n = moment(filterStartTime)
                        .add(m, 'day')
                        .format('MM-DD'),
                    o = moment(filterStartTime)
                        .add(m, 'day')
                        .format('YYYY-MM-DD')
                xAxisCategories[m] = n
                headerFormat[m] = o + ' 00:00'
            }
        } else if ('other' === duration) {
            var _p = moment(filterEndTime).subtract(filterStartTime, 'milliseconds')
            var pp: any = (_p as any) / 10
            for (var p = pp, q = 0; q < 10; q++) {
                var r = moment(filterStartTime)
                    .add((q + 1) * p, 'milliseconds')
                    .format('YYYY-MM-DD HH:mm')
                xAxisCategories[q] = r
                headerFormat[q] = r
            }
        }
        console.log(1122, xAxisCategories, headerFormat)
    }
}
</script>

<style lang="less" scoped>
.Monitor ::v-deep {
    background-color: transparent !important;
    padding: 0 !important;

    .total {
        color: #7cb5ec;
        font-size: 18px;
    }
    .el-table .cell {
        line-height: 1.2;
    }
    .table {
        height: calc(100% - 230px);

        .sg-dataview-container,
        .sg-dataview-wrapper {
            height: 100%;
            display: flex;
            flex: 1;
            flex-direction: column;
        }
        .el-table {
            flex: 1;
        }
    }
    .sg-card-header {
        min-height: 36px;
    }

    .EventMainBody {
        background: #26262e;
    }
    .ErrorEventBlock {
        cursor: pointer;
    }
    .SummaryContentMessage {
        line-height: 1.2;
    }
    .SummaryContentIcons {
        display: flex;
        font-size: 12px;
        color: #999;
    }

    .el-form-item {
        margin: 0 !important;
    }
    .el-radio-group {
        vertical-align: top;
        margin-left: 10px;
    }

    .el-col {
        width: auto;
    }
}
</style>
