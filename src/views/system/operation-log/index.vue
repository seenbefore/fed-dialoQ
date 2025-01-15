<template>
    <admin-page class="OperationLog">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { list, OperationLogVO } from './api'
import { OperationTypeEnum, OperationTypeEnumMap, OperationStatusEnum, OperationStatusEnumMap, OperationModuleEnum, OperationModuleEnumMap } from './enum'
import moment from 'moment'

@Component({
    name: 'OperationLog',
    components: {},
})
export default class OperationLog extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {
        operationTime: [
            moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD'),
            moment().format('YYYY-MM-DD'),
        ],
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async openDetailDialog(row: OperationLogVO) {
        await this.$modalDialog(() => import('./components/detail-dialog/index.vue'), {
            id: row.id,
        })
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'operator',
                itemAttrs: {
                    label: '操作人',
                },
                attrs: {
                    placeholder: '请输入操作人姓名',
                },
            },
            {
                tag: 'select',
                name: 'operationType',
                itemAttrs: {
                    label: '操作类型',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        const arr = Object.values(OperationTypeEnumMap)
                        arr.unshift({
                            label: '全部',
                            value: '',
                        })
                        return arr
                    },
                },
            },
            {
                tag: 'daterange',
                name: 'operationTime',
                itemAttrs: {
                    label: '操作时间',
                },
                attrs: {
                    'start-placeholder': '开始日期',
                    'end-placeholder': '结束日期',
                    'value-format': 'yyyy-MM-dd',
                },
            },
            {
                tag: 'select',
                name: 'status',
                itemAttrs: {
                    label: '操作状态',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        const arr = Object.values(OperationStatusEnumMap)
                        arr.unshift({
                            label: '全部',
                            value: '',
                        })
                        return arr
                    },
                },
            },
            {
                tag: 'select',
                name: 'module',
                itemAttrs: {
                    label: '操作模块',
                },
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        const arr = Object.values(OperationModuleEnumMap)
                        arr.unshift({
                            label: '全部',
                            value: '',
                        })
                        return arr
                    },
                },
            },
        ]
        return {
            autoAppendAction: true,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '50px',
            },
            {
                label: '操作人',
                prop: 'operator',
                minWidth: '100px',
            },
            {
                label: '操作类型',
                prop: 'operationType',
                minWidth: '100px',
                render: (h, { row }) => {
                    const { operationType } = row
                    return OperationTypeEnumMap[operationType]?.label || '-'
                },
            },
            {
                label: '操作描述',
                prop: 'description',
                minWidth: '200px',
            },
            {
                label: '操作模块',
                prop: 'module',
                minWidth: '100px',
                render: (h, { row }) => {
                    const { module } = row
                    return OperationModuleEnumMap[module]?.label || '-'
                },
            },
            {
                label: '操作状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const { status } = row
                    const { label, color } = OperationStatusEnumMap[status] || {}
                    return <span style={{ color }}>{label}</span>
                },
            },
            {
                label: '操作IP',
                prop: 'ip',
                minWidth: '120px',
            },
            {
                label: '操作时间',
                prop: 'operationTime',
                minWidth: '170px',
                sortable: 'custom',
            },
            {
                label: '操作',
                fixed: 'right',
                width: '100px',
                render: (h, { row }) => {
                    return (
                        <el-button type="text" onClick={() => this.openDetailDialog(row)}>
                            详情
                        </el-button>
                    )
                },
            },
        ]

        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            pageActionLayout: [
                {
                    key: 'export',
                    label: '导出',
                },
                {
                    key: 'exportAll',
                    label: '导出全部',
                },
            ],
            load: async (params: any = {}) => {
                const { operationTime, ...rest } = this.formModel
                const [operationTimeStart, operationTimeEnd] = operationTime || []
                const { data } = await list({
                    ...params,
                    ...rest,
                    operationTimeStart,
                    operationTimeEnd,
                })
                return {
                    result: data.data,
                    total: data.total,
                }
            },
            columns,
        }
    }
}
</script>

<style scoped lang="less">
.OperationLog ::v-deep {
    padding: 0px;
}
</style>
