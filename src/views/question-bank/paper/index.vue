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
import { list, ExamPaperVO } from './api'
import moment from 'moment'
import RenderExport from '@/sharegood-ui/src/utils/renderExport'

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
                label: '考试时长(分钟)',
                prop: 'duration',
                minWidth: '120px',
            },
            {
                label: '总分',
                prop: 'totalScore',
                minWidth: '80px',
            },
            {
                label: '及格分',
                prop: 'passScore',
                minWidth: '80px',
            },
            {
                label: '题目数量',
                prop: 'totalQuestions',
                minWidth: '100px',
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
                label: '创建时间',
                prop: 'createTime',
                minWidth: '170px',
                render: (h, { row }) => {
                    return <div>{moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                },
            },
            {
                label: '操作',
                prop: 'action',
                width: '210px',
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
                                预览
                            </el-button>
                            <el-button
                                type="text"
                                onClick={() => {
                                    this.handleExport(row)
                                }}
                            >
                                导出
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

    async handleExport(row: ExamPaperVO) {
        // 定义基础列配置
        const baseColumns = [
            { prop: 'answerCount', label: '答题数', type: 'number', width: 100 },
            { prop: 'score', label: '得分', type: 'number', width: 100 },
            { prop: 'result', label: '结果', width: 100 },
            {
                prop: 'personalInfo',
                label: '个人信息',
                width: 600,
                children: [
                    { prop: 'name', label: '姓名', width: 100 },
                    { prop: 'idCard', label: '身份证号', width: 100 },
                    { prop: 'phone', label: '手机', width: 100 },
                    { prop: 'studentId', label: '学号', width: 100 },
                    { prop: 'gender', label: '性别', width: 100 },
                    { prop: 'company', label: '单位名称', width: 100 },
                ],
            },
        ]

        // 模拟数据
        const { data } = await this.$http.get('/exam/question/getExamPaperResult', {
            id: row.id,
        })

        // 根据试题数据生成动态列
        const questionColumns = data[0].pager.map((question, index) => {
            const questionOptions = JSON.parse(question.questionOptions)
            const optionsText = questionOptions.map((opt: any) => `${opt.code}.${opt.content}`).join('\n')

            return {
                prop: `question${index + 1}`,
                label: question.questionContent,
                width: 600,
                children: [
                    {
                        prop: `q${index + 1}Result`,
                        label: '答题结果',
                        width: 100,
                        exportRender: (row: any) => {
                            const value = row.pager[index].result
                            return value === '正确'
                                ? {
                                      v: value,
                                      s: {
                                          fill: {
                                              fgColor: { rgb: '92D050' },
                                          },
                                      },
                                  }
                                : {
                                      v: value,
                                      s: {
                                          fill: {
                                              fgColor: { rgb: 'FF0000' },
                                          },
                                      },
                                  }
                        },
                    },
                    {
                        prop: `q${index + 1}Answer`,
                        label: '学员答案',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.pager[index].userAnswer,
                        }),
                    },
                    {
                        prop: `q${index + 1}Correct`,
                        label: '正确答案',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.pager[index].correctAnswer,
                        }),
                    },
                    {
                        prop: `q${index + 1}Options`,
                        label: '全部选项',
                        width: 200,
                        exportRender: (row: any) => ({
                            v: optionsText,
                        }),
                    },
                    {
                        prop: `q${index + 1}Score`,
                        label: '得分',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.pager[index].score,
                        }),
                    },
                    {
                        prop: `q${index + 1}Total`,
                        label: '总分',
                        width: 100,
                        exportRender: (row: any) => ({
                            v: row.pager[index].totalScore,
                        }),
                    },
                ],
            }
        })

        // 定义尾部列配置
        const endColumns = [
            { prop: 'startTime', label: '开始时间', width: 150 },
            { prop: 'submitTime', label: '提交时间', width: 150 },
            { prop: 'duration', label: '答题时长', width: 100 },
            { prop: 'ipProvince', label: 'IP省份', width: 100 },
            { prop: 'ipCity', label: 'IP城市', width: 100 },
            { prop: 'ipAddress', label: 'IP地址', width: 120 },
            { prop: 'browser', label: '浏览器', width: 100 },
            { prop: 'os', label: '操作系统', width: 100 },
        ]

        // 合并所有列配置
        const columns = [...baseColumns, ...questionColumns, ...endColumns]

        // 使用RenderExport导出
        const exporter = new RenderExport(columns, {
            defaultValue: '-',
        })
        exporter.downloadExl(data, `${row.paperName}-答题记录`)
    }

    mounted() {}
}
</script>

<style lang="less" scoped>
.QuestionPaperList ::v-deep {
    padding: 0px;
}
</style>
