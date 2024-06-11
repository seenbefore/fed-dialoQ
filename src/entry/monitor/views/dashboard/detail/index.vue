<!-- 错误详情 -->
<template>
    <div class="MonitorDetail sg-page column">
        <div class="EventMainBody">
            <FilterBox :type="'detail'"></FilterBox>
            <div class="sg-card-body EventTopErrorSummaryContainer">
                <div class="ErrorDetailContent">
                    <div class="ErrorDetailLeft">
                        <div class="ErrorWhiteSpace">
                            <span class="ErrorDetailErrorClass ng-binding">
                                <span class="ErrorDetailEventCount">{{ info.name }}</span>
                            </span>
                            <!-- <div class="ErrorDetailErrorLocation ng-binding">{{ info.url }}</div> -->
                        </div>
                        <div class="ErrorDetailMenu">页面地址：{{ info.url }}</div>
                        <div class="ErrorDetailMenu" style="color:#FFF;height:40px;overflow-y:auto;">错误信息：{{ info.message }}</div>
                    </div>
                    <div class="ErrorDetailRight">
                        <div class="ErrorRightRowContainer">
                            <div class="ErrorRightRow">
                                <h4 class="ErrorDetailEventCount ">{{ countInfo.eventCount }}</h4>
                                <div class="ErrorRowTitle">事件数</div>
                            </div>
                            <div class="ErrorRightRow">
                                <h4 class="ErrorDetailUserCount ng-binding">{{ countInfo.userCount }}</h4>
                                <div class="ErrorRowTitle">用户数</div>
                            </div>
                            <div class="ErrorRightRow">
                                <h4 class="ErrorDetailStageSeverity ng-binding">
                                    {{ countInfo.deviceCount }}
                                </h4>
                                <div class="ErrorRowTitle ng-scope">设备数</div>
                            </div>
                        </div>
                    </div>
                </div>
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
import FilterBox from '../components/FilterBox.vue'
import { formatTimeAgo, dateFormat } from '@/scripts/utils'
import { termCount, list } from '@/entry/monitor/api'

@Component({
    name: 'MonitorDetail',
    components: {
        FilterBox,
    },
})
export default class MonitorDetail extends Vue {
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
        }
    }
    countInfo = {
        eventCount: 0,
        userCount: 0,
        deviceCount: 0,
    }
    info: any = {}
    @Prop()
    messageId!: string
    mounted() {}
    @Ref('tableRef')
    tableRef!: TableRef
    get tableAttrs() {
        return {
            height: '100%',
            border: false,
            pagination: { pageSize: 10 },
            auto: false,
            load: async (pageInfo: any) => {
                const { startTime, endTime, searchType, search } = this.filters
                const term: any = {}

                const _query: any = {
                    bool: {
                        must: [
                            {
                                match: {
                                    messageId: this.messageId,
                                },
                            },
                            {
                                range: {
                                    time: {
                                        gte: new Date(startTime).valueOf(),
                                        lte: new Date(endTime).valueOf(),
                                    },
                                },
                            },
                        ],
                    },
                }
                if (searchType && search) {
                    _query.bool.must.unshift({
                        match: {
                            [searchType]: search,
                        },
                    })
                }
                const { data } = await list({
                    query: _query,

                    ...pageInfo,
                    // pageNum: 2,
                    // length: 10,
                })
                const firstData = data?.data?.[0] || {}
                const info = firstData.data || {}
                info.url = info.url || ''
                info.url = info.url.split('?')[0]
                info.name = info.name || ''
                info.name = info.name.split('?')[0]
                this.$set(this, 'info', info)
                this.countInfo.eventCount = data.total || 0

                try {
                    const filter: any = {
                        messageId: this.messageId,
                        startTime,
                        endTime,
                    }
                    if (searchType) {
                        const arr = searchType.split('.')
                        if (arr.length > 1) {
                            filter[arr[1]] = search || ''
                        } else {
                            filter[searchType] = search || ''
                        }
                    }
                    const { data } = await termCount({
                        filter,
                    })
                    this.countInfo.deviceCount = data.deviceCount || 0
                    this.countInfo.userCount = data.userCount || 0
                } catch (error) {}

                return { result: data.data, total: data.total }
            },
            columns: [
                {
                    label: '序号',
                    type: 'index',
                },
                {
                    label: '报错类型',
                    prop: '报错类型',
                    width: '180px',
                    align: 'left',

                    render: (h, { row }) => {
                        const result = row.data.type
                        return <div style="font-size:16px;font-weight:bolder;">{result}</div>
                    },
                },
                {
                    label: '报错信息',
                    prop: '报错信息',
                    minWidth: '350px',
                    align: 'left',

                    showOverflowTooltip: false,
                    render: (h, { row }) => {
                        const result = row.data.message
                        return <div style="font-size:12px;color:#999;">{result}</div>
                    },
                },
                {
                    label: '报错页面',
                    prop: '报错页面',
                    minWidth: '220px',
                    align: 'left',
                    showOverflowTooltip: false,
                    render: (h, { row }) => {
                        const title = row.data.title
                        const result = row.data.url
                        return (
                            <div>
                                <div>{title}</div>
                                <div>
                                    <el-link href={result} target="_blank" type="primary" underline={false}>
                                        {result}
                                    </el-link>
                                </div>
                            </div>
                        )
                    },
                },

                {
                    label: '报错时间',
                    prop: 'entname',
                    width: '170px',
                    render: (h, { row }) => {
                        const result = dateFormat(row.time, 'YYYY-MM-DD HH:mm:ss')
                        return <div>{result}</div>
                    },
                },
                {
                    label: '项目标识',
                    prop: 'entname',
                    minWidth: '120px',
                    showOverflowTooltip: false,
                    render: (h, { row }) => {
                        const result = row.clientName
                        return <div>{result}</div>
                    },
                },

                {
                    label: '用户标识',
                    prop: 'entname',
                    showOverflowTooltip: false,
                    width: '120px',
                    render: (h, { row }) => {
                        const result = row.authInfo.trackerId
                        return <div>{result}</div>
                    },
                },
                {
                    label: '设备标识',
                    prop: 'entname',
                    width: '100px',
                    render: (h, { row }) => {
                        const result = row.deviceId
                        return <div>{result}</div>
                    },
                },

                {
                    label: '浏览器信息',
                    prop: 'entname',
                    width: '120px',
                    render: (h, { row }) => {
                        const result = row.deviceInfo.browser
                        return <div>{result}</div>
                    },
                },
                {
                    label: '操作系统',
                    prop: 'entname',
                    width: '100px',
                    render: (h, { row }) => {
                        const result = row.deviceInfo.os
                        return <div>{result}</div>
                    },
                },
                {
                    label: 'SDK版本',
                    prop: 'entname',
                    width: '80px',
                    render: (h, { row }) => {
                        const result = row.authInfo.sdkVersion
                        return <div>{result}</div>
                    },
                },

                {
                    label: '操作',
                    prop: 'action',
                    width: '180px',
                    align: 'left',
                    fixed: 'right',
                    render: (h, { row }) => {
                        return (
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        this.$modalDialog(() => import(/* webpackChunkName: "UserActionDialog" */ './components/UserActionDialog/index.vue'), {
                                            isEdit: true,
                                            id: row.username,
                                            row,
                                        })
                                    }}
                                >
                                    查看用户行为
                                </el-button>
                                <el-button
                                    type="text"
                                    onClick={() => {
                                        this.$modalDialog(() => import(/* webpackChunkName: "ErrorDetailDialog" */ './components/ErrorDetailDialog/index.vue'), {
                                            row: row.data,
                                        })
                                    }}
                                >
                                    错误详情
                                </el-button>
                            </div>
                        )
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
}
</script>

<style lang="less" scoped>
.MonitorDetail ::v-deep {
    background-color: transparent !important;
    padding: 0 !important;

    .ErrorDetailMenu {
        line-height: 1.2;
        opacity: 0.5;
    }
    .table {
        height: calc(100% - 170px);

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
    .gray {
        color: #999fa3;
    }
    .bg {
        color: #35353d;
    }
    .EventMainBody {
        background: #26262e;
    }
    .ErrorDetailEventCount {
        color: #f86846;
    }
    .ErrorDetailUserCount {
        color: #008df2;
    }
    .ErrorDetailStageSeverity {
        color: #00c2a6;
    }

    .EventTopErrorSummaryContainer {
        background: #26262e;
        height: 112px;
        z-index: 2;
        padding: 0;

        .ErrorDetailContent {
            height: 110px;
            display: -ms-flexbox;
            display: flex;
            margin: 1px;
            color: #999fa3;

            .ErrorDetailLeft {
                padding: 15px 15px;
                background-color: #35353d;
                flex: 1;
                line-height: 24px;

                .ErrorDetailErrorClass {
                    font-size: 16px;
                    font-weight: 600;
                }
                .ErrorDetailErrorLocation {
                    content: '·';
                    margin: 0.25rem;
                }
            }
            .ErrorDetailRight {
                width: 400px;
                min-width: 400px;
                height: 100%;
                display: -ms-flexbox;
                display: flex;
                text-align: center;
                background-color: #35353d;
                margin-left: 1px;

                .ErrorRightRowContainer {
                    margin-left: 35px;
                    display: flex;
                    align-items: center;
                    .ErrorRightRow {
                        width: 110px;
                        font-size: 16px;

                        h4 {
                            line-height: 1.2;
                            font-size: 28px;
                            margin: 0;
                        }
                        .ErrorRowTitle {
                            color: rgba(255, 255, 255, 0.398);
                            font-size: 13px;
                        }
                    }
                }
            }
        }
    }
    .el-table {
        .cell {
            line-height: 1.2;
        }
    }
}
</style>
