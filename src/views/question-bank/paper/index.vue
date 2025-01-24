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
import { list, ExamPaperVO, remove } from './api'
import moment from 'moment'

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

    // 获取单元格基础样式
    getCellStyle() {
        return {
            border: {
                top: { style: 'thin', color: '#666' },
                bottom: { style: 'thin', color: '#666' },
                left: { style: 'thin', color: '#666' },
                right: { style: 'thin', color: '#666' },
            },
            font: {
                sz: 10,
                bold: false,
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
            },
        }
    }

    handleSearch() {
        this.tableRef.onLoad({ page: 1 })
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'paperName',
                label: '试卷名称',
                attrs: {
                    placeholder: '请输入试卷名称',
                },
            },
        ]
        return {
            fields,
            autoAppendAction: true,
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
                prop: 'paperName',
                fixed: 'left',
                width: '270px',
                align: 'left',
            },
            {
                label: '状态',
                prop: 'status',
                minWidth: '120px',
                render: (h, { row }) => {
                    // 根据考试开始时间、结束时间、当前时间判断状态
                    const now = moment()
                    const startTime = moment(row.startTime)
                    const endTime = moment(row.endTime)
                    if (now.isBefore(startTime)) {
                        return <el-tag type="info">未开始</el-tag>
                    } else if (now.isAfter(endTime)) {
                        return <el-tag type="success">已结束</el-tag>
                    } else {
                        return <el-tag type="primary">进行中</el-tag>
                    }
                },
            },

            {
                label: '单选题',
                minWidth: '180px',
                render: (h, { row }) => {
                    return (
                        <div>
                            {row.singleChoiceCount}题/{row.singleChoiceScore}分/题
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
                            {row.multipleChoiceCount}题/{row.multipleChoiceScore}分/题
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
                            {row.judgeCount}题/{row.judgeScore}分/题
                        </div>
                    )
                },
            },
            {
                label: '总题数',
                prop: 'totalQuestions',
                minWidth: '100px',
            },
            {
                label: '总分',
                prop: 'totalScore',
                minWidth: '80px',
            },
            {
                label: '考试开始时间',
                prop: 'startTime',
                minWidth: '170px',
                render: (h, { row }) => {
                    return <div>{moment(row.startTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                },
            },
            {
                label: '考试结束时间',
                prop: 'endTime',
                minWidth: '170px',
                render: (h, { row }) => {
                    return <div>{moment(row.endTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                },
            },
            {
                label: '考试时长',
                prop: 'duration',
                minWidth: '100px',
                render: (h, { row }) => {
                    return <div>{row.duration}分钟</div>
                },
            },

            {
                label: '操作',
                prop: 'action',
                width: '240px',
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
                                onClick={() => {
                                    this.handleDetail(row)
                                }}
                            >
                                答题情况
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
                } as any)
                return {
                    result: data.data,
                    total: data.total,
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

    async handleEdit(row: ExamPaperVO) {
        const result = await this.$modalDialog(() => import('./components/paper-drawer/index.vue'), {
            action: 'modify',
            id: row.id,
            data: row,
        })
        if (result) {
            this.handleSearch()
        }
    }

    async handleDelete(row: ExamPaperVO) {
        await this.$confirm('确认删除该试卷?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        await remove({ paperId: row.id })
        this.$message.success('删除成功')
        this.handleSearch()
    }

    async handlePreview(row: ExamPaperVO) {
        // 改为打开浏览器标签页
        const { href } = this.$router.resolve({
            path: '/question-bank/paper/preview',
            query: {
                id: row.id,
            },
        })
        window.open(href, '_blank')
    }
    async handleDetail(row: ExamPaperVO) {
        console.log(111, row)
        const result = await this.$modalDialog(() => import('./components/page-detail-drawer/index.vue'), {
            action: 'detail',
            paperId: row.id,

            data: row,
        })
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.QuestionPaperList ::v-deep {
    padding: 0px;
}
</style>
