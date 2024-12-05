<template>
    <div class="sg-page icinfo-ai QuestionBankList">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 在查询条件和列表之间添加 -->
        <div class="sg-flexbox align-center justify-between" style="margin-bottom: 7px;">
            <div>
                <el-button type="primary" @click="handleAdd">新增题目</el-button>
                <el-button type="primary" @click="handleImport">导入题库</el-button>
            </div>
        </div>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef"></sg-data-view>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { list } from './api'

@Component({
    name: 'QuestionBankList',
    components: {},
})
export default class QuestionBankList extends Vue {
    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    formModel: Record<string, any> = {}

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'title',
                label: '题目',
                attrs: {
                    placeholder: '请输入题目',
                },
            },
            {
                tag: 'select',
                name: 'kind',
                label: '所属大类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '全部', value: '' },
                            { label: '2024年全省协助执法文员考试', value: '1' },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'category',
                label: '所属分类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '全部', value: '' },
                            { label: '法律法规', value: '1' },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'type',
                label: '题目类型',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '全部', value: '' },
                            { label: '单选题', value: '0' },
                            { label: '多选题', value: '1' },
                            { label: '判断题', value: '2' },
                        ]
                    },
                },
            },
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
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },
            {
                label: 'ID',
                prop: 'id',
                minWidth: '80px',
            },
            {
                label: '所属大类',
                prop: 'kind_name',
                minWidth: '180px',
            },
            {
                label: '所属分类',
                prop: 'case_name',
                minWidth: '120px',
            },
            {
                label: '题目',
                prop: 'title',
                minWidth: '300px',
            },
            {
                label: '答案',
                prop: 'answer',
                minWidth: '80px',
            },
            {
                label: '操作',
                prop: 'action',
                width: '150px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handleEdit(row)
                                }}
                            >
                                编辑
                            </el-button>
                            <el-button
                                type="text"
                                danger
                                onClick={() => {
                                    this.handleDelete(row)
                                }}
                            >
                                删除
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            // 表格滚动吸顶 不要���减
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.QuestionBankList'),
            },
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
    async handleAdd() {
        const result = await this.$modalDialog(() => import('./components/question-drawer/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }

    // 修改handleEdit方法
    async handleEdit(row: any) {
        const result = await this.$modalDialog(() => import('./components/question-drawer/index.vue'), {
            action: 'modify',
            id: row.id,
            data: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: any) {
        await this.$confirm('确认删除该题目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        this.$message.success('删除成功')
        this.handleSearch()
    }
    async handleImport() {
        const result = await this.$modalDialog(() => import('./components/import-drawer/index.vue'))
        if (result) {
            this.handleSearch()
        }
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.QuestionBankList ::v-deep {
    padding: 0px;
}
</style>
