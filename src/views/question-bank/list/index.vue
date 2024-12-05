<template>
    <div class="sg-page icinfo-ai QuestionBankList">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

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
            pagination: { pageSize: 10 },
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

    handleEdit(row: any) {
        this.$router.push({
            path: `/question-bank/edit?id=${row.id}`,
        })
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

    mounted() {
        this.handleSearch()
    }
}
</script>

<style lang="less" scoped>
.QuestionBankList ::v-deep {
    padding: 0px;
}
</style>
