<template>
    <div class="sg-page icinfo-ai MyCase">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 操作按钮 -->
        <div class="sg-table-operator">
            <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, FormRef, TableColumn, TableRef } from '@/sharegood-ui'
import { StatusEnum, StatusEnumMap } from './enum'
import { list } from './api'

@Component({
    name: 'MyCase',
    components: {},
})
export default class MyCase extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleView(row: any) {
        const { archiveUrl } = row
        console.log(archiveUrl)
        await this.$modalDialog(() => import('@/views/file-review/components/file-dialog/index.vue'), {
            fileUrl: archiveUrl,
        })
    }

    async handleEdit(row: any) {
        const result = await this.$modalDialog(() => import('./components/case-drawer/index.vue'), {
            id: row.id,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/case-dialog/index.vue'), {})
        if (result) {
            // TODO: 调用保存接口
            this.$message.success('新增成功')
            this.handleSearch()
        }
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'select',
                name: 'caseType',
                label: '卷宗类型',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '行政处罚', value: '1' },
                            { label: '行政检查', value: '2' },
                        ]
                    },
                },
            },
            {
                tag: 'input',
                name: 'caseName',
                label: '卷宗名称',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'input',
                name: 'target',
                label: '对象',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'input',
                name: 'returnNo',
                label: '归档号',
                attrs: {
                    placeholder: '请输入',
                },
            },
            {
                tag: 'select',
                name: 'status',
                label: '申请状态',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return Object.values(StatusEnumMap)
                    },
                },
            },
            {
                tag: 'action',
                span: 24,
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
        ]
        return {
            span: 8,
            fields,
        }
    }

    get getTableAttrs() {
        const columns: TableColumn[] = [
            {
                label: '序号',
                type: 'index',
                width: '50px',
                fixed: 'left',
            },
            {
                label: '卷宗类型',
                prop: 'caseType',
                minWidth: '120px',
            },
            {
                label: '卷宗名称',
                prop: 'caseName',
                minWidth: '250px',
                render: (h, { row }) => {
                    return (
                        <el-button
                            type="text"
                            onClick={() => {
                                this.$postMessage({
                                    type: 'route',
                                    name: 'FileReviewMyCaseDetail',
                                    title: '查看卷宗',
                                    data: {
                                        id: row.id,
                                    },
                                })
                            }}
                        >
                            {row.caseName}
                        </el-button>
                    )
                },
            },
            {
                label: '对象',
                prop: 'target',
                minWidth: '120px',
            },
            {
                label: '归档日期',
                prop: 'returnDate',
                width: '170px',
            },
            {
                label: '归档号',
                prop: 'returnNo',
                minWidth: '250px',
            },
            {
                label: '申请状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const status = StatusEnumMap[row.status as keyof typeof StatusEnumMap]
                    const colorMap = {
                        [StatusEnum.PENDING]: '#FF9900', // 待审批 黄色
                        [StatusEnum.APPROVED]: '#67C23A', // 通过 绿色
                        [StatusEnum.REJECTED]: '#F56C6C', // 退回 红色
                    }
                    const color = colorMap[row.status as keyof typeof StatusEnum] || ''

                    if (row.status === StatusEnum.REJECTED) {
                        // 退回状态显示悬浮提示
                        return (
                            <el-tooltip content={row.rejectReason || '无退回理由'} placement="top" effect="light">
                                <span style={{ color }}>{status?.label || '-'}</span>
                            </el-tooltip>
                        )
                    }

                    return <span style={{ color }}>{status?.label || '-'}</span>
                },
            },
            {
                label: '更新时间',
                prop: 'updateTime',
                width: '170px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '120px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" onClick={() => this.handleView(row)}>
                                查看
                            </el-button>
                            <el-button type="text" onClick={() => this.handleEdit(row)}>
                                修改
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            pagination: { pageSize: 10 },
            pageActionLayout: [],
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                    ...this.formModel,
                })
                return {
                    result: data.data,
                    total: data.recordsTotal,
                }
            },
            columns,
        }
    }
}
</script>

<style lang="less" scoped>
.MyCase ::v-deep {
    padding: 0px;
}
</style>
