<template>
    <div class="sg-page icinfo-ai QuestionPaperList">
        <!-- 查询条件 -->
        <sg-base-form ref="formRef" v-bind="getFormAttrs" v-model="formModel" @submit="handleSearch" @reset="handleSearch"></sg-base-form>

        <!-- 操作按钮 -->
        <div class="sg-flexbox align-center justify-between" style="margin-bottom: 7px;">
            <div>
                <el-button type="primary" @click="handleAdd">新增试卷</el-button>
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
    name: 'QuestionPaperList',
    components: {},
})
export default class QuestionPaperList extends Vue {
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
                label: '试卷名称',
                attrs: {
                    placeholder: '请输入试卷名称',
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
                label: '试卷名称',
                prop: 'title',
                minWidth: '250px',
            },
            {
                label: '考试时长(分钟)',
                prop: 'duration',
                minWidth: '120px',
            },
            {
                label: '总分',
                prop: 'grade_score',
                minWidth: '80px',
            },
            {
                label: '题目数量',
                prop: 'grade_z',
                minWidth: '100px',
            },
            {
                label: '单选题',
                minWidth: '180px',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.dan}题/{row.dan_grade}分/题
                        </div>
                    )
                },
            },
            {
                label: '多选题',
                minWidth: '180px',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.duo}题/{row.duo_grade}分/题
                        </div>
                    )
                },
            },
            {
                label: '判断题',
                minWidth: '180px',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.pan}题/{row.pan_grade}分/题
                        </div>
                    )
                },
            },
            {
                label: '案例题',
                minWidth: '180px',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.case}题/{row.case_grade}分/题
                        </div>
                    )
                },
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
                                onClick={() => {
                                    this.handlePreview(row)
                                }}
                            >
                                试卷预览
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
            tableHeaderSticky: {
                scrollDom: () => document.querySelector('.QuestionPaperList'),
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
        const result = await this.$modalDialog(() => import('./components/paper-drawer/index.vue'), {
            action: 'create',
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleEdit(row: any) {
        const result = await this.$modalDialog(() => import('./components/paper-drawer/index.vue'), {
            action: 'modify',
            id: row.id,
            data: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: any) {
        await this.$confirm('确认删除该试卷?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handlePreview(row: any) {
        this.$router.push(`/question-bank/paper/preview?id=${row.id}`)
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.QuestionPaperList ::v-deep {
    padding: 0px;
}
</style>
