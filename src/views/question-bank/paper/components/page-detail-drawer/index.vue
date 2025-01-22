<!-- src/views/question-bank/paper/components/paper-drawer/index.vue -->
<template>
    <el-drawer class="PaperDrawer" :title="title" :visible="true" :before-close="cancel" size="1200px">
        <div class="drawer-container" v-loading="loading">
            <!-- 基本信息 -->
            <div class="detail-section">
                <div class="detail-title">基本信息</div>
                <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
            </div>

            <!-- 答题详情 -->
            <div class="detail-section">
                <div class="detail-title">答题详情</div>
                <sg-base-form ref="formRef2" v-model="formModel2" v-bind="getFormAttrs2" @submit="handleSearch" @reset="handleSearch"></sg-base-form>
                <sg-data-view v-bind="getTableAttrs" ref="tableRef">
                    <template #header>
                        <el-button type="primary" @click="handleExportAll">导出全部</el-button>
                        <span class="sg-ml-3">本场考试共有{{ count.total }}人答题，其中通过{{ count.pass }}人，未通过{{ count.fail }}人。</span>
                    </template>
                </sg-data-view>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { FormColumn, TableColumn, FormRef, TableRef } from '@/sharegood-ui'
import { getExamRecordDetail, ExamRecordDetailVO, getExamRecordPageList } from '../../api'
import RenderExport from '@/sharegood-ui/src/utils/renderExport'
import moment from 'moment'

@Component({
    name: 'PaperDrawer',
})
export default class PaperDrawer extends Vue {
    /** 试卷ID */
    @Prop({ required: true }) paperId!: string
    @Prop({ default: () => ({}) }) data!: any

    @Ref('formRef')
    formRef!: FormRef
    @Ref('tableRef')
    tableRef!: TableRef

    loading = false
    formModel: Partial<ExamRecordDetailVO> = {
        ...this.data,
    }
    formModel2: any = {
        paperId: this.paperId,
    }
    mounted() {
        this.getAllData()
    }
    private count = {
        total: 0,
        pass: 0,
        fail: 0,
    }
    async getAllData() {
        const { data } = await getExamRecordPageList({
            length: 1000,
            paperId: this.paperId,
            pageNum: 1,
        })
        this.count.total = data.total
        this.count.pass = data.data.filter((item: any) => item.isPass === '1').length
        this.count.fail = data.data.filter((item: any) => item.isPass === '0').length
    }
    get title() {
        return this.data.paperName
    }

    async handleExportAll() {
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
            paperId: this.paperId,
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
        exporter.downloadExl(data, `${this.data.paperName}`)
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'text',
                name: 'isCompleted',
                itemAttrs: {
                    label: '考试状态',
                },
                render: (h, { row }) => {
                    return <el-tag type={row.isCompleted === '1' ? 'success' : 'warning'}>{row.isCompleted === '1' ? '已完成' : '未完成'}</el-tag>
                },
            },
            {
                tag: 'text',
                name: 'userIp',
                itemAttrs: {
                    label: '考试时间',
                },
                render: (h, { row }) => {
                    return (
                        <span>
                            {moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')} - {moment(row.endTime).format('YYYY-MM-DD HH:mm:ss')}
                        </span>
                    )
                },
            },
            {
                tag: 'text',
                name: 'osInfo',
                itemAttrs: {
                    label: '考试时长',
                },
                render: (h, { row }) => {
                    return <span>{row.duration}分钟</span>
                },
            },
        ]
        return {
            span: 12,
            fields,
        }
    }
    @Ref('formRef2')
    formRef2!: FormRef
    get getFormAttrs2() {
        const fields: FormColumn[] = [
            {
                tag: 'input',
                name: 'keyword',
                itemAttrs: {
                    label: '关键字',
                },
            },
            {
                tag: 'daterange',
                name: 'daterange',
                itemAttrs: {
                    label: '更新日期',
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
                prop: 'index',
                fixed: 'left',
                width: '50px',
            },
            {
                label: '姓名',
                prop: 'userName',
                width: '100px',
                fixed: 'left',
            },
            {
                label: '学号',
                prop: 'studentNo',
                width: '120px',
            },
            {
                label: '手机号',
                prop: 'mobile',
                width: '120px',
                render: (h, { row }) => {
                    // 隐藏手机号中间四位
                    const mobile = row.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    return <span>{mobile}</span>
                },
            },
            {
                label: '答题数',
                prop: 'answerCount',
                width: '80px',
            },
            {
                label: '答题状态',
                prop: 'isCompleted',
                width: '100px',
                render: (h, { row }) => {
                    return <el-tag type={row.isCompleted === '1' ? 'success' : 'warning'}>{row.isCompleted === '1' ? '已完成' : '未完成'}</el-tag>
                },
            },
            {
                label: '得分',
                prop: 'score',
                width: '80px',
                render: (h, { row }) => {
                    return <span class={row.isPass === '1' ? 'text-success' : 'text-danger'}>{row.score}</span>
                },
            },
            {
                label: '结果    ',
                prop: 'isPass',
                width: '80px',
                render: (h, { row }) => {
                    return <el-tag type={row.isPass === '1' ? 'success' : 'danger'}>{row.isPass === '1' ? '通过' : '未通过'}</el-tag>
                },
            },

            {
                label: '开始时间',
                prop: 'actualStartTime',
                width: '160px',
            },
            {
                label: '结束时间',
                prop: 'actualEndTime',
                width: '160px',
            },
            {
                label: '答题时长',
                prop: 'duration',
                width: '100px',
                render: (h, { row }) => {
                    return <span>{row.duration}分钟</span>
                },
            },
            {
                label: '操作系统',
                prop: 'osInfo',
                width: '120px',
            },
            {
                label: '浏览器',
                prop: 'browserInfo',
                width: '120px',
            },
            {
                label: 'IP地址',
                prop: 'userIp',
                width: '130px',
            },

            {
                label: '操作',
                prop: 'userIp',
                width: '130px',
                fixed: 'right',
                render: (h, { row }) => {
                    return (
                        <div>
                            <el-button type="text" size="small" onClick={() => this.handleDetail(row)}>
                                答卷详情
                            </el-button>
                        </div>
                    )
                },
            },
        ]

        return {
            pageActionLayout: [],
            columns,
            load: async (params: any) => {
                const { daterange, keyword } = this.formModel2
                const [startTime, endTime] = daterange || []

                const { data } = await getExamRecordPageList({
                    ...params,
                    paperId: this.paperId,
                    startTime,
                    endTime,
                    keyword,
                } as any)
                return {
                    total: data.total,
                    data: data.data,
                }
            },
        }
    }
    handleSearch() {
        this.tableRef.onLoad()
    }
    cancel() {
        this.$options.cancel?.()
    }
    handleDetail(row: any) {
        this.$modalDialog(() => import('./answer-detail-dialog/index.vue'), {
            paperId: this.paperId,
            userId: row.userId,
            data: row,
        })
    }
}
</script>

<style lang="less" scoped>
.PaperDrawer {
    ::v-deep {
        .drawer-container {
            padding: 20px;
            height: 100%;
            overflow-y: auto;
        }
        .detail-section {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .detail-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 4px solid var(--color-primary);
        }
        .score {
            font-size: 18px;
            font-weight: bold;
        }
        .el-form-item {
            margin-bottom: 15px;
        }
    }
}
</style>
