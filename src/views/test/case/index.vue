<template>
    <admin-page class="TestCase">
        <!-- 查询表单 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" @selection-change-all="onChange">
            <template #header>
                <div class="sg-flexbox align-center">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="primary" @click="handleDeleteBatch">批量删除</el-button>
                </div>
            </template>
        </sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import AdminPage from '@/components/admin/admin-page/index.vue'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { CaseTypeEnum, CaseTypeEnumMap, PriorityEnum, PriorityEnumMap, ExecuteStatusEnum, ExecuteStatusEnumMap } from './enum'
import { list, remove, removeBatch, TestCaseVO } from './api'

@Component({
    name: 'TestCase',
    components: {
        AdminPage,
    },
})
export default class TestCase extends Vue {
    @Ref('formRef')
    formRef!: FormRef

    @Ref('tableRef')
    tableRef!: TableRef

    formModel: any = {}
    selected: any = []

    onChange(val: any) {
        this.selected = val.map((item: any) => ({ id: item.id }))
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/case-dialog/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: TestCaseVO) {
        const result = await this.$modalDialog(() => import('./components/case-dialog/index.vue'), {
            id: row.id,
            action: 'modify',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: TestCaseVO) {
        await this.$confirm('删除后将无法找回，是否确认删除？', '提示', {
            type: 'warning',
        })
        await remove({ id: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handleDeleteBatch() {
        if (!this.selected.length) {
            return this.$message.warning('请选择要删除的数据')
        }
        await this.$confirm('删除后将无法找回，是否确认删除？', '提示', {
            type: 'warning',
        })
        await removeBatch({ ids: this.selected.map((item: any) => item.id) })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'name',
                label: '用例名称',
                attrs: {
                    placeholder: '请输入用例名称',
                },
            },
            {
                tag: 'select',
                name: 'type',
                label: '用例类型',
                attrs: {
                    placeholder: '请选择用例类型',
                    options: () => {
                        const arr = Object.values(CaseTypeEnumMap)
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
                name: 'priority',
                label: '优先级',
                attrs: {
                    placeholder: '请选择优先级',
                    options: () => {
                        const arr = Object.values(PriorityEnumMap)
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
                name: 'status',
                label: '执行状态',
                attrs: {
                    placeholder: '请选择执行状态',
                    options: () => {
                        const arr = Object.values(ExecuteStatusEnumMap)
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
                name: 'createTime',
                label: '创建时间',
                attrs: {
                    'value-format': 'yyyy-MM-dd',
                    'start-placeholder': '开始日期',
                    'end-placeholder': '结束日期',
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
                type: 'selection',
                width: '50px',
                fixed: 'left',
            },
            {
                type: 'index',
                label: '序号',
                width: '50px',
                fixed: 'left',
            },
            {
                label: '用例名称',
                prop: 'name',
                minWidth: '150px',
            },
            {
                label: '用例类型',
                prop: 'type',
                minWidth: '100px',
                render: (h, { row }) => {
                    return CaseTypeEnumMap[row.type as keyof typeof CaseTypeEnum]?.label || '-'
                },
            },
            {
                label: '优先级',
                prop: 'priority',
                minWidth: '80px',
                render: (h, { row }) => {
                    const item = PriorityEnumMap[row.priority as keyof typeof PriorityEnum]
                    if (item) {
                        return h(
                            'el-tag',
                            {
                                props: {
                                    type: 'info',
                                    effect: 'plain',
                                },
                                style: {
                                    color: item.color,
                                },
                            },
                            item.label,
                        )
                    }
                    return '-'
                },
            },
            {
                label: '执行状态',
                prop: 'status',
                minWidth: '100px',
                render: (h, { row }) => {
                    const item = ExecuteStatusEnumMap[row.status as keyof typeof ExecuteStatusEnum]
                    if (item) {
                        return h(
                            'el-tag',
                            {
                                props: {
                                    type: 'info',
                                    effect: 'plain',
                                },
                                style: {
                                    color: item.color,
                                },
                            },
                            item.label,
                        )
                    }
                    return '-'
                },
            },
            {
                label: '最后执行时间',
                prop: 'lastExecuteTime',
                minWidth: '170px',
            },
            {
                label: '创建人',
                prop: 'createBy',
                minWidth: '100px',
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
            },
            {
                label: '操作',
                fixed: 'right',
                width: '150px',
                render: (h, { row }) => {
                    return h('div', [
                        h(
                            'el-button',
                            {
                                props: {
                                    type: 'text',
                                },
                                on: {
                                    click: () => this.handleEdit(row),
                                },
                            },
                            '编辑',
                        ),
                        h(
                            'el-button',
                            {
                                props: {
                                    type: 'text',
                                    danger: true,
                                },
                                on: {
                                    click: () => this.handleDelete(row),
                                },
                            },
                            '删除',
                        ),
                    ])
                },
            },
        ]

        return {
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            multipleSelectionAll: [],
            idKey: 'id',
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
                const { createTime, ...rest } = this.formModel
                const [createTimeStart, createTimeEnd] = createTime || []
                const { data } = await list({
                    ...params,
                    ...rest,
                    createTimeStart,
                    createTimeEnd,
                } as any)
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

<style scoped lang="less">
.TestCase ::v-deep {
    padding: 0px;
}
</style>
