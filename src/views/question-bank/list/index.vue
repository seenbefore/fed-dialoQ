<template>
    <admin-page class="QuestionBankList">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 列表 -->
        <sg-data-view v-bind="getTableAttrs" ref="tableRef" v-model="formModel">
            <template #header>
                <el-button type="primary" @click="handleAdd">新增题目</el-button>
                <el-button type="primary" @click="handleImport">导入题库</el-button>
            </template>
        </sg-data-view>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
import { FormRow, FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { list, save, remove, detail, QuestionVO } from './api'

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
                name: 'questionContent',
                label: '题目',
                attrs: {
                    placeholder: '请输入题目关键字',
                },
            },
            {
                tag: 'select',
                name: 'categoryCode',
                label: '所属大类',
                attrs: {
                    placeholder: '请选择',
                    options: async () => {
                        return [
                            { label: '全部', value: '' },
                            { label: '2024年全省协助执法文员考试', value: '6' },
                        ]
                    },
                },
            },
            {
                tag: 'select',
                name: 'questionTypeCode',
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
                prop: 'categoryName',
                minWidth: '180px',
            },
            {
                label: '所属分类',
                prop: 'subCategoryName',
                minWidth: '120px',
            },
            {
                label: '题目',
                prop: 'questionContent',
                minWidth: '300px',
            },
            {
                label: '答案',
                prop: 'correctAnswer',
                minWidth: '80px',
            },
            {
                label: '创建人',
                prop: 'creatorName',
                minWidth: '100px',
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '160px',
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
            // 表格滚动吸顶 不要删减
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.admin-page__content'),
            },
            pageActionLayout: [],
            load: async (params: any = {}) => {
                const { data } = await list({
                    ...params,
                })
                return {
                    result: data.data,
                    total: parseInt(data.total),
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

    async handleEdit(row: QuestionVO) {
        const result = await this.$modalDialog(() => import('./components/question-drawer/index.vue'), {
            action: 'modify',
            id: row.id,
            data: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: QuestionVO) {
        await this.$confirm('确认删除该题目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        await remove({ id: row.id })
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
