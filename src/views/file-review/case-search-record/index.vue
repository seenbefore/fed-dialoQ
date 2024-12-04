<template>
    <div class="sg-page icinfo-ai CaseSearchRecord">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { StatusEnum, StatusEnumMap } from './enum'
import { list, getDictList } from './api'
import moment from 'moment'

@Component({
    name: 'CaseSearchRecord',
    components: {},
})
export default class CaseSearchRecord extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    get getFormAttrs() {
        const fields: FormRow[] = [
            {
                columns: [
                    {
                        tag: 'input',
                        name: 'applicantName',
                        itemAttrs: {
                            label: '申请人',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'applicantPhone',
                        itemAttrs: {
                            label: '手机号',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'daterange',
                        name: 'applyTime',
                        itemAttrs: {
                            label: '申请时间',
                        },
                        attrs: {
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            'value-format': 'yyyy-MM-dd',
                            'picker-options': {
                                disabledDate: time => {
                                    const today = new Date()
                                    const sixtyYearsAgo = new Date()
                                    sixtyYearsAgo.setFullYear(today.getFullYear() - 60)
                                    return time.getTime() > today.getTime() || time.getTime() < sixtyYearsAgo.getTime()
                                },
                            },
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'volumeType',
                        itemAttrs: {
                            label: '卷宗类型',
                        },
                        attrs: {
                            placeholder: '请输入',
                            filterable: true,
                            'default-first-option': true,
                            options: async () => {
                                const { data } = await getDictList({ dictType: 'archive_type' })
                                return data.map((item: any) => ({
                                    label: item.dictChineseName,
                                    value: item.dictCode,
                                }))
                            },
                        },
                    },
                    {
                        tag: 'input',
                        name: 'volumeNumber',
                        itemAttrs: {
                            label: '编号',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'applyStatus',
                        itemAttrs: {
                            label: '审批状态',
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [
                                { label: '全部', value: '' },
                                { label: '审批通过', value: StatusEnum.APPROVED },
                                { label: '审批退回', value: StatusEnum.REJECTED },
                            ],
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        span: 24,
                        tag: 'action',
                        buttons: [
                            {
                                isSubmit: true,
                                type: 'primary',
                                text: '查询',
                                svgIcon: 'icon-search',
                                icon: 'search-btn',
                            },
                            {
                                isReset: true,
                                type: 'reset',
                                text: '重置',
                                svgIcon: 'icon-reset',
                                icon: 'icon-reset',
                            },
                        ],
                    },
                ],
            },
        ]
        return {
            span: 8,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '申请人',
                prop: 'applicantName',
                minWidth: '100px',
            },
            {
                label: '所属',
                prop: 'applicantDeptName',
                minWidth: '100px',
            },
            {
                label: '手机号',
                prop: 'applicantPhone',
                minWidth: '120px',
            },
            {
                label: '申请时间',
                prop: 'applyTime',
                minWidth: '160px',
                render: (h, { row }) => {
                    return <span>{moment(row.applyTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '卷宗类型',
                prop: 'volumeTypeName',
                minWidth: '100px',
            },
            {
                label: '卷宗名称',
                prop: 'volumeName',
                minWidth: '200px',
            },
            {
                label: '卷宗编号',
                prop: 'volumeNumber',
                minWidth: '200px',
            },
            {
                label: '卷宗对象',
                prop: 'volumeObjectName',
                minWidth: '120px',
            },
            {
                label: '归档日期',
                prop: 'archiveTime',
                minWidth: '120px',
                render: (h, { row }) => {
                    return <span>{moment(row.archiveTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                label: '申请状态',
                prop: 'applyStatus',
                minWidth: '100px',
                render: (h, { row }) => {
                    const status = StatusEnumMap[row.applyStatus as keyof typeof StatusEnumMap]
                    const colorMap = {
                        [StatusEnum.PENDING]: '#FF9900',
                        [StatusEnum.APPROVED]: '#67C23A',
                        [StatusEnum.REJECTED]: '#F56C6C',
                    }
                    const color = colorMap[row.applyStatus as keyof typeof StatusEnum] || ''

                    if (row.applyStatus === StatusEnum.REJECTED) {
                        return (
                            <el-tooltip content={row.approveRemark || '无退回理由'} placement="top" effect="light">
                                <span style={{ color }}>{status?.label || '-'}</span>
                            </el-tooltip>
                        )
                    }

                    return <span style={{ color }}>{status?.label || '-'}</span>
                },
            },
            {
                label: '审批时间',
                prop: 'approveTime',
                minWidth: '160px',
                render: (h, { row }) => {
                    return <span>{row.approveTime ? moment(row.approveTime).format('YYYY-MM-DD HH:mm') : '-'}</span>
                },
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { applyTime, ...rest } = this.formModel
                // 日期范围处理
                const [applyStartTime, applyEndTime] = applyTime || []
                const { data } = await list({
                    ...params,
                    ...rest,
                    applyStartTime,
                    applyEndTime,
                })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
            pageActionLayout: [],
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }
}
</script>

<style lang="less" scoped>
.CaseSearchRecord {
    padding: 20px;
}
</style>
