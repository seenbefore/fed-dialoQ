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
import { AUDIT_STATUS, AUDIT_STATUS_MAP } from './enum'
import { getList } from './api'

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
                        name: 'applicant',
                        itemAttrs: {
                            label: '申请人：',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'input',
                        name: 'phone',
                        itemAttrs: {
                            label: '手机号：',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'daterange',
                        name: 'applyTime',
                        itemAttrs: {
                            label: '申请时间：',
                        },
                        attrs: {
                            'start-placeholder': '开始时间',
                            'end-placeholder': '结束时间',
                            'value-format': 'yyyy-MM-dd',
                        },
                    },
                ],
            },
            {
                columns: [
                    {
                        tag: 'select',
                        name: 'caseType',
                        itemAttrs: {
                            label: '卷宗类型：',
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [
                                { label: '全部', value: '' },
                                { label: '行政处罚', value: '1' },
                                { label: '行政检查', value: '2' },
                            ],
                        },
                    },
                    {
                        tag: 'input',
                        name: 'code',
                        itemAttrs: {
                            label: '编号：',
                        },
                        attrs: {
                            placeholder: '请输入',
                        },
                    },
                    {
                        tag: 'select',
                        name: 'status',
                        itemAttrs: {
                            label: '审批状态：',
                        },
                        attrs: {
                            placeholder: '请选择',
                            options: [{ label: '全部', value: '' }, ...Object.values(AUDIT_STATUS_MAP)],
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
                prop: 'applicant',
                minWidth: '100px',
            },
            {
                label: '所属',
                prop: 'department',
                minWidth: '120px',
            },
            {
                label: '手机号',
                prop: 'phone',
                minWidth: '120px',
            },
            {
                label: '申请时间',
                prop: 'applyTime',
                minWidth: '160px',
            },
            {
                label: '卷宗类型',
                prop: 'caseType',
                minWidth: '100px',
            },
            {
                label: '卷宗名称',
                prop: 'caseName',
                minWidth: '200px',
            },
            {
                label: '编号',
                prop: 'code',
                minWidth: '200px',
            },
            {
                label: '对象',
                prop: 'target',
                minWidth: '120px',
            },
            {
                label: '归档日期',
                prop: 'returnDate',
                minWidth: '120px',
            },
            {
                label: '审批状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const { status } = row
                    const { label, color } = AUDIT_STATUS_MAP[status] || {}
                    return <span style={{ color }}>{label}</span>
                },
            },
            {
                label: '审批时间',
                prop: 'auditTime',
                minWidth: '160px',
            },
        ]

        return {
            load: async (params: any = {}) => {
                const { applyTime, ...rest } = this.formModel
                // 日期范围处理
                const [applyTimeStart, applyTimeEnd] = applyTime || []
                const { data } = await getList({
                    ...params,
                    ...rest,
                    applyTimeStart,
                    applyTimeEnd,
                })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
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
